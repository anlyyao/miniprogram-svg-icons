/**
 * @mp-svg-icons/utils — iconfont CSS 解析与裁剪
 *
 * 解析 iconfont 图标组件的 CSS 文件，识别图标规则并执行裁剪。
 *
 * iconfont CSS 文件的典型结构：
 *   - @import 语句
 *   - @font-face 声明
 *   - 基础样式（如 .t-icon、.van-icon 等基础类）
 *   - 图标规则：.prefix-iconName:before{content:"\\eXXX";}
 *   - 其他辅助样式
 *
 * 裁剪策略：移除未使用图标的 CSS 规则，保留所有基础样式。
 */

import fs from 'fs';

import type { IconfontCssData } from './types';

/**
 * 自动检测 CSS 中的 iconfont 图标前缀
 *
 * 通过匹配 `.prefix-xxx:before{content:...}` 模式，统计频率最高的公共前缀。
 * 例如：`.t-icon-home:before{...}` → "t-icon"
 */
export function detectCssPrefix(content: string): string | null {
  const ruleRegex = /\.([\w-]+):before\s*\{[^}]*content\s*:\s*['"][^'"]+['"]/g;
  const classNames: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = ruleRegex.exec(content)) !== null) {
    classNames.push(match[1]);
  }

  if (classNames.length < 2) {
    if (classNames.length === 1) {
      const knownPrefixes = ['t-icon', 'van-icon', 'iconfont'];
      for (const prefix of knownPrefixes) {
        if (classNames[0].startsWith(prefix + '-')) {
          return prefix;
        }
      }
    }
    return null;
  }

  // 从不同位置取样以避免排序导致的偏差
  const samples: string[] = [];
  const step = Math.max(1, Math.floor(classNames.length / 10));
  for (let i = 0; i < classNames.length && samples.length < 20; i += step) {
    samples.push(classNames[i]);
  }
  // 确保包含最后几个
  if (classNames.length > 3) {
    samples.push(classNames[classNames.length - 1]);
    samples.push(classNames[Math.floor(classNames.length / 2)]);
  }

  // 按 `-` 分段找最长公共前缀
  const segmentsList = samples.map((name) => name.split('-'));
  const minSegments = Math.min(...segmentsList.map((s) => s.length));

  let commonSegmentCount = 0;
  for (let i = 0; i < minSegments - 1; i++) {
    const segment = segmentsList[0][i];
    const allMatch = segmentsList.every((segs) => segs[i] === segment);
    if (allMatch) {
      commonSegmentCount = i + 1;
    } else {
      break;
    }
  }

  if (commonSegmentCount === 0) return null;

  const prefix = segmentsList[0].slice(0, commonSegmentCount).join('-');

  // 验证前缀有效性
  if (!prefix || !/[a-z]/i.test(prefix)) return null;

  return prefix;
}

const ICON_RULES_PLACEHOLDER = '/* __ICON_RULES_PLACEHOLDER__ */';

/**
 * 从 CSS 中解析图标规则，拆分为图标规则和基础内容。
 * 基础内容中保留占位符标记图标规则的原始位置。
 */
export function parseIconfontCss(
  content: string,
  prefix: string,
): { iconRules: Map<string, string>; baseContent: string } {
  const iconRules = new Map<string, string>();

  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const iconRuleRegex = new RegExp(
    `\\.${escapedPrefix}-([\\w-]+):before\\s*\\{[^}]*content\\s*:\\s*['"][^'"]+['"]\\s*;?\\s*\\}`,
    'g',
  );

  let match: RegExpExecArray | null;
  while ((match = iconRuleRegex.exec(content)) !== null) {
    const iconName = match[1];
    const rule = match[0];
    iconRules.set(iconName, rule);
  }

  let placeholderInserted = false;
  const baseContent = content.replace(iconRuleRegex, () => {
    if (!placeholderInserted) {
      placeholderInserted = true;
      return ICON_RULES_PLACEHOLDER;
    }
    return '';
  });

  return { iconRules, baseContent };
}

/** 加载并解析 iconfont CSS 文件，不存在时返回 null */
export function loadIconfontCss(cssFilePath: string, prefix?: string): IconfontCssData | null {
  if (!fs.existsSync(cssFilePath)) return null;

  let content: string;
  try {
    content = fs.readFileSync(cssFilePath, 'utf-8');
  } catch {
    console.warn(`⚠️ 无法读取样式文件: ${cssFilePath}`);
    return null;
  }

  const detectedPrefix = prefix || detectCssPrefix(content);
  if (!detectedPrefix) {
    console.warn(`⚠️ 未能检测到 iconfont 前缀: ${cssFilePath}`);
    return null;
  }

  const { iconRules, baseContent } = parseIconfontCss(content, detectedPrefix);

  if (iconRules.size === 0) {
    console.warn(`⚠️ 样式文件中未解析到图标规则: ${cssFilePath}`);
    return null;
  }

  return {
    filePath: cssFilePath,
    prefix: detectedPrefix,
    iconRules,
    baseContent,
    originalSize: Buffer.byteLength(content, 'utf-8'),
  };
}

/** 将连续的多个空行压缩为单个换行符 */
function cleanupEmptyLines(content: string): string {
  const cleaned = content.replace(/(\r?\n\s*){2,}/g, '\n');
  return cleaned.trim() + '\n';
}

/** 生成裁剪后的 CSS，将保留的图标规则插回占位符位置 */
function generateClearedCss(baseContent: string, keptRules: string[]): string {
  const rulesStr = keptRules.join('');

  let result: string;

  if (baseContent.includes(ICON_RULES_PLACEHOLDER)) {
    result = baseContent.replace(ICON_RULES_PLACEHOLDER, rulesStr);
  } else {
    result = baseContent + rulesStr;
  }

  return cleanupEmptyLines(result);
}

/** 裁剪 iconfont CSS —— 只保留使用中的图标规则 */
export function clearIconfontCss(cssData: IconfontCssData, usedIcons: Set<string>, dryRun: boolean): number {
  const keptRules: string[] = [];

  for (const [iconName, rule] of cssData.iconRules) {
    if (usedIcons.has(iconName)) {
      keptRules.push(rule);
    }
  }

  const newContent = generateClearedCss(cssData.baseContent, keptRules);

  if (!dryRun) {
    fs.writeFileSync(cssData.filePath, newContent);
  }

  const newSize = Buffer.byteLength(newContent, 'utf-8');
  return Math.max(0, cssData.originalSize - newSize);
}

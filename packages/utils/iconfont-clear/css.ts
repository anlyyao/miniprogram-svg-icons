/**
 * iconfont-clear — CSS 样式文件解析与裁剪
 */

import fs from 'fs';
import type { IconfontCssData } from './types';

/** 从 CSS 内容中自动检测 iconfont 前缀（如 t-icon、van-icon） */
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
        if (classNames[0].startsWith(prefix + '-')) return prefix;
      }
    }
    return null;
  }

  const samples: string[] = [];
  const step = Math.max(1, Math.floor(classNames.length / 10));
  for (let i = 0; i < classNames.length && samples.length < 20; i += step) {
    samples.push(classNames[i]);
  }
  if (classNames.length > 3) {
    samples.push(classNames[classNames.length - 1], classNames[Math.floor(classNames.length / 2)]);
  }

  const segmentsList = samples.map((name) => name.split('-'));
  const minSegments = Math.min(...segmentsList.map((s) => s.length));

  let commonSegmentCount = 0;
  for (let i = 0; i < minSegments - 1; i++) {
    if (segmentsList.every((segs) => segs[i] === segmentsList[0][i])) {
      commonSegmentCount = i + 1;
    } else {
      break;
    }
  }

  if (!commonSegmentCount) return null;

  const prefix = segmentsList[0].slice(0, commonSegmentCount).join('-');
  return prefix && /[a-z]/i.test(prefix) ? prefix : null;
}

const ICON_RULES_PLACEHOLDER = '/* __ICON_RULES_PLACEHOLDER__ */';

/** 解析 iconfont CSS，分离图标规则和基础样式 */
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
    iconRules.set(match[1], match[0]);
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

/**
 * 加载并解析 iconfont 样式文件
 * @param cssFilePath 样式文件路径
 * @param prefix 可选的手动指定前缀
 */
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
  if (!iconRules.size) {
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

function cleanupEmptyLines(content: string): string {
  return content.replace(/(\r?\n\s*){2,}/g, '\n').trim() + '\n';
}

function generateClearedCss(baseContent: string, keptRules: string[]): string {
  const rulesStr = keptRules.join('');
  const result = baseContent.includes(ICON_RULES_PLACEHOLDER)
    ? baseContent.replace(ICON_RULES_PLACEHOLDER, rulesStr)
    : baseContent + rulesStr;
  return cleanupEmptyLines(result);
}

/** 裁剪 iconfont CSS —— 只保留使用中的图标规则 */
export function clearIconfontCss(cssData: IconfontCssData, usedIcons: Set<string>, dryRun: boolean): number {
  const keptRules: string[] = [];
  for (const [iconName, rule] of cssData.iconRules) {
    if (usedIcons.has(iconName)) keptRules.push(rule);
  }

  const newContent = generateClearedCss(cssData.baseContent, keptRules);
  if (!dryRun) fs.writeFileSync(cssData.filePath, newContent);

  return Math.max(0, cssData.originalSize - Buffer.byteLength(newContent, 'utf-8'));
}

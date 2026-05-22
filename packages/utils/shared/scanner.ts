import fs from 'fs';
import path from 'path';

import { JSON_EXTENSIONS, TEMPLATE_EXTENSIONS, APP_JSON_FILE } from './constants';
import { walkDir, isExcluded, escapeRegExp } from './utils';

/** 文件收集结果 */
export interface CollectedFiles {
  /** JSON 文件内容列表 */
  readonly jsonFiles: { content: string }[];
  /** 模板文件内容列表 */
  readonly templateFiles: { content: string }[];
}

/**
 * 从 JSON 文件中提取图标组件标签名
 *
 * 解析 usingComponents，匹配指向 icon 组件的路径，
 * 收集对应的自定义标签名（如 t-icon、my-icon）。
 */
export function extractIconTagNames(content: string, iconPathRegex: RegExp): Set<string> {
  const tagNames = new Set<string>();

  try {
    const json = JSON.parse(content);
    const usingComponents = json?.usingComponents;
    if (!usingComponents || typeof usingComponents !== 'object') {
      return tagNames;
    }

    for (const [tagName, componentPath] of Object.entries(usingComponents)) {
      if (typeof componentPath !== 'string') continue;

      const normalized = componentPath.replace(/\\/g, '/');
      if (iconPathRegex.test(normalized)) {
        tagNames.add(tagName);
      }
    }
  } catch {
    // JSON 解析失败，静默跳过
  }

  return tagNames;
}

/**
 * 从模板内容中提取图标名称（简单模式，不区分品牌）
 *
 * 适用于 iconfont-clear 等不需要品牌分组的场景。
 *
 * @param content 模板文件内容
 * @param allIconNames 全量图标名集合（用于验证）
 * @param tagNames 图标组件标签名集合
 * @returns 使用中的图标名集合
 */
export function extractIconNamesSimple(content: string, allIconNames: Set<string>, tagNames: Set<string>): Set<string> {
  const found = new Set<string>();
  if (tagNames.size === 0) return found;

  const tagPattern = [...tagNames].map(escapeRegExp).join('|');
  const tagRegex = new RegExp(`<(?:${tagPattern})\\b([^<]*?)(?:/>|>)`, 'gi');
  const nameAttrRegex = /\bname\s*=\s*["']([a-z][a-z0-9-]*)["']/gi;

  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = tagRegex.exec(content)) !== null) {
    const attrs = tagMatch[1];

    let attrMatch: RegExpExecArray | null;
    while ((attrMatch = nameAttrRegex.exec(attrs)) !== null) {
      const iconName = attrMatch[1];
      if (allIconNames.has(iconName)) {
        found.add(iconName);
      }
    }
    nameAttrRegex.lastIndex = 0;
  }

  return found;
}

/**
 * 从模板内容中提取图标名称（品牌模式，按品牌分组）
 *
 * 适用于 clear（SVG 图标裁剪）需要区分品牌的场景。
 *
 * @param content 模板文件内容
 * @param allIconNames 全量图标名集合
 * @param tagNames 图标组件标签名集合
 * @param brandNameSet 品牌名集合（用于验证 brand 属性值）
 * @param defaultBrand 默认品牌名
 * @returns 按品牌分组的图标名集合
 */
export function extractIconNamesWithBrand(
  content: string,
  allIconNames: Set<string>,
  tagNames: Set<string>,
  brandNameSet: Set<string>,
  defaultBrand: string,
): Map<string, Set<string>> {
  const foundByBrand = new Map<string, Set<string>>();
  if (tagNames.size === 0) return foundByBrand;

  const tagPattern = [...tagNames].map(escapeRegExp).join('|');
  const tagRegex = new RegExp(`<(?:${tagPattern})\\b([^<]*?)(?:/>|>)`, 'gi');
  // 合并提取 name 和 brand 属性
  const attrRegex = /\b(name|brand)\s*=\s*["']([a-z][a-z0-9-]*)["']/gi;

  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = tagRegex.exec(content)) !== null) {
    const attrs = tagMatch[1];

    // 提取属性值
    let iconName = '';
    let brand = defaultBrand;
    let attrMatch: RegExpExecArray | null;

    while ((attrMatch = attrRegex.exec(attrs)) !== null) {
      const [, key, value] = attrMatch;
      if (key.toLowerCase() === 'name') {
        iconName = value;
      } else if (key.toLowerCase() === 'brand' && brandNameSet.has(value)) {
        brand = value;
      }
    }
    attrRegex.lastIndex = 0; // 重置正则状态

    // 验证并添加有效图标
    if (iconName && allIconNames.has(iconName)) {
      if (!foundByBrand.has(brand)) {
        foundByBrand.set(brand, new Set());
      }
      foundByBrand.get(brand)!.add(iconName);
    }
  }

  return foundByBrand;
}

/**
 * 通用扫描流程：从 JSON 文件中收集图标组件标签名
 *
 * @param jsonFiles JSON 文件内容列表
 * @param iconPathRegex 图标组件路径匹配正则
 * @returns 图标组件标签名集合
 */
export function collectIconTagNames(jsonFiles: readonly { content: string }[], iconPathRegex: RegExp): Set<string> {
  const allIconTagNames = new Set<string>();
  for (const { content } of jsonFiles) {
    const tags = extractIconTagNames(content, iconPathRegex);
    for (const tag of tags) {
      allIconTagNames.add(tag);
    }
  }
  return allIconTagNames;
}

/**
 * 收集扫描目录中的 JSON 和模板文件内容
 *
 * @param scanDirs 要扫描的目录列表
 * @param excludeDirs 需要排除的目录集合
 * @returns JSON 文件和模板文件的内容列表
 */
export function collectFiles(scanDirs: readonly string[], excludeDirs: Set<string>): CollectedFiles {
  const jsonFiles: { content: string }[] = [];
  const templateFiles: { content: string }[] = [];
  const processedJsonPaths = new Set<string>();

  // 优先读取 cwd 下的 app.json
  const cwdAppJson = path.resolve(process.cwd(), APP_JSON_FILE);
  if (fs.existsSync(cwdAppJson)) {
    try {
      jsonFiles.push({ content: fs.readFileSync(cwdAppJson, 'utf-8') });
      processedJsonPaths.add(cwdAppJson);
    } catch {
      // 静默跳过
    }
  }

  // 遍历扫描目录
  for (const dir of scanDirs) {
    const resolvedDir = path.resolve(process.cwd(), dir);

    if (!fs.existsSync(resolvedDir)) {
      console.warn(`⚠️ 扫描目录不存在，已跳过: ${dir}`);
      continue;
    }

    if (isExcluded(resolvedDir, excludeDirs)) {
      console.warn(`⚠️ 扫描目录位于排除路径内，已跳过: ${dir}`);
      continue;
    }

    for (const file of walkDir(resolvedDir, excludeDirs)) {
      let content: string;
      try {
        content = fs.readFileSync(file, 'utf-8');
      } catch {
        continue;
      }

      const ext = path.extname(file).toLowerCase();

      if (JSON_EXTENSIONS.has(ext)) {
        const resolvedFile = path.resolve(file);
        if (processedJsonPaths.has(resolvedFile)) continue;
        processedJsonPaths.add(resolvedFile);
        jsonFiles.push({ content });
      }
      if (TEMPLATE_EXTENSIONS.has(ext)) {
        templateFiles.push({ content });
      }
    }
  }

  return { jsonFiles, templateFiles };
}

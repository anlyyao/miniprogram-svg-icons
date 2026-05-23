/**
 * 通用扫描器
 *
 * 从 JSON 文件中提取图标组件标签名，从模板文件中提取图标使用。
 */

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
 * 解析 usingComponents，匹配指向 icon 组件的路径，收集对应的自定义标签名。
 */
export function extractIconTagNames(content: string, iconPathRegex: RegExp): Set<string> {
  const tagNames = new Set<string>();
  try {
    const json = JSON.parse(content);
    const usingComponents = json?.usingComponents;
    if (!usingComponents || typeof usingComponents !== 'object') return tagNames;

    for (const [tagName, componentPath] of Object.entries(usingComponents)) {
      if (typeof componentPath === 'string' && iconPathRegex.test(componentPath.replace(/\\/g, '/'))) {
        tagNames.add(tagName);
      }
    }
  } catch {}
  return tagNames;
}

/**
 * 从模板内容中提取图标名称（简单模式，不区分品牌）
 *
 * @param content 模板文件内容
 * @param allIconNames 全量图标名集合（用于验证）
 * @param tagNames 图标组件标签名集合
 * @returns 使用中的图标名集合
 */
export function extractIconNamesSimple(content: string, allIconNames: Set<string>, tagNames: Set<string>): Set<string> {
  const found = new Set<string>();
  if (!tagNames.size) return found;

  const tagPattern = [...tagNames].map(escapeRegExp).join('|');
  const tagRegex = new RegExp(`<(?:${tagPattern})\\b([^<]*?)(?:/>|>)`, 'gi');
  const nameAttrRegex = /\bname\s*=\s*["']([a-z][a-z0-9-]*)["']/gi;

  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = tagRegex.exec(content)) !== null) {
    let attrMatch: RegExpExecArray | null;
    while ((attrMatch = nameAttrRegex.exec(tagMatch[1])) !== null) {
      if (allIconNames.has(attrMatch[1])) found.add(attrMatch[1]);
    }
    nameAttrRegex.lastIndex = 0;
  }

  return found;
}

/**
 * 从模板内容中提取图标名称（品牌模式，按品牌分组）
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
  if (!tagNames.size) return foundByBrand;

  const tagPattern = [...tagNames].map(escapeRegExp).join('|');
  const tagRegex = new RegExp(`<(?:${tagPattern})\\b([^<]*?)(?:/>|>)`, 'gi');
  const attrRegex = /\b(name|brand)\s*=\s*["']([a-z][a-z0-9-]*)["']/gi;

  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = tagRegex.exec(content)) !== null) {
    const attrs = tagMatch[1];
    let iconName = '';
    let brand = defaultBrand;
    let attrMatch: RegExpExecArray | null;

    // 同时提取 name 和 brand 属性
    while ((attrMatch = attrRegex.exec(attrs)) !== null) {
      if (attrMatch[1].toLowerCase() === 'name') iconName = attrMatch[2];
      else if (attrMatch[1].toLowerCase() === 'brand' && brandNameSet.has(attrMatch[2])) brand = attrMatch[2];
    }
    attrRegex.lastIndex = 0;

    if (iconName && allIconNames.has(iconName)) {
      if (!foundByBrand.has(brand)) foundByBrand.set(brand, new Set());
      foundByBrand.get(brand)!.add(iconName);
    }
  }

  return foundByBrand;
}

/**
 * 从 JSON 文件中收集图标组件标签名
 * @param jsonFiles JSON 文件内容列表
 * @param iconPathRegex 图标组件路径匹配正则
 * @returns 图标组件标签名集合
 */
export function collectIconTagNames(jsonFiles: readonly { content: string }[], iconPathRegex: RegExp): Set<string> {
  const allTags = new Set<string>();
  for (const { content } of jsonFiles) {
    for (const tag of extractIconTagNames(content, iconPathRegex)) {
      allTags.add(tag);
    }
  }
  return allTags;
}

/**
 * 收集扫描目录中的 JSON 和模板文件内容
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
    } catch {}
  }

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
        const resolved = path.resolve(file);
        if (processedJsonPaths.has(resolved)) continue;
        processedJsonPaths.add(resolved);
        jsonFiles.push({ content });
      }
      if (TEMPLATE_EXTENSIONS.has(ext)) {
        templateFiles.push({ content });
      }
    }
  }

  return { jsonFiles, templateFiles };
}

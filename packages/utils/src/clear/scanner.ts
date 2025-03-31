/**
 * @mp-svg-icons/utils— 文件扫描与图标识别
 *
 * 扫描项目源码中的 JSON 配置和模板文件，识别图标组件引用和使用情况。
 */

import fs from 'fs';
import path from 'path';

import type { ScanContext, ScanResult } from './types';
import { JSON_EXTENSIONS, TEMPLATE_EXTENSIONS, APP_JSON_FILE } from './constants';
import { escapeRegExp } from './utils';
import { walkDir, isExcluded } from './path-utils';

/**
 * 从 JSON 文件中提取图标组件信息
 */
function extractAllFromJson(
  content: string,
  iconPathRegex: RegExp,
  singleIconPathRegex: RegExp,
): {
  iconTagNamesByBrand: Map<string, Set<string>>;
  singleIconRefsByBrand: Map<string, Set<string>>;
} {
  const iconTagNamesByBrand = new Map<string, Set<string>>();
  const singleIconRefsByBrand = new Map<string, Set<string>>();

  try {
    const json = JSON.parse(content);
    const usingComponents = json?.usingComponents;
    if (!usingComponents || typeof usingComponents !== 'object') {
      return { iconTagNamesByBrand, singleIconRefsByBrand };
    }

    for (const [tagName, componentPath] of Object.entries(usingComponents)) {
      if (typeof componentPath !== 'string') continue;

      const normalized = componentPath.replace(/\\/g, '/');

      // 匹配通用组件
      const iconMatch = normalized.match(iconPathRegex);
      if (iconMatch) {
        const brandName = iconMatch[1] || '';
        if (!iconTagNamesByBrand.has(brandName)) {
          iconTagNamesByBrand.set(brandName, new Set());
        }
        iconTagNamesByBrand.get(brandName)!.add(tagName);
        continue;
      }

      // 匹配单图标组件
      const singleMatch = normalized.match(singleIconPathRegex);
      if (singleMatch) {
        const brandName = singleMatch[1] || '';
        const iconName = singleMatch[2];
        if (!singleIconRefsByBrand.has(brandName)) {
          singleIconRefsByBrand.set(brandName, new Set());
        }
        singleIconRefsByBrand.get(brandName)!.add(iconName);
      }
    }
  } catch {
    // JSON 解析失败，静默跳过
  }

  return { iconTagNamesByBrand, singleIconRefsByBrand };
}

/**
 * 从模板内容中提取图标名称和品牌（按品牌分组）
 */
function extractIconNamesFromTemplate(
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
 * 扫描所有源文件，提取图标使用信息
 */
export function scanAllFiles(
  scanDirs: readonly string[],
  ctx: ScanContext,
): ScanResult {
  const { excludeDirs, allIconNameSet, iconPathRegex, singleIconPathRegex, brandNameSet, defaultBrand } = ctx;

  const iconTagNamesByBrand = new Map<string, Set<string>>();
  const singleIconRefsByBrand = new Map<string, Set<string>>();
  const iconsByBrand = new Map<string, Set<string>>();

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

  // 阶段一：从 JSON 文件提取组件信息
  for (const { content } of jsonFiles) {
    const result = extractAllFromJson(content, iconPathRegex, singleIconPathRegex);

    for (const [brandName, tags] of result.iconTagNamesByBrand) {
      if (!iconTagNamesByBrand.has(brandName)) {
        iconTagNamesByBrand.set(brandName, new Set());
      }
      for (const tag of tags) {
        iconTagNamesByBrand.get(brandName)!.add(tag);
      }
    }

    for (const [brandName, refs] of result.singleIconRefsByBrand) {
      if (!singleIconRefsByBrand.has(brandName)) {
        singleIconRefsByBrand.set(brandName, new Set());
      }
      for (const ref of refs) {
        singleIconRefsByBrand.get(brandName)!.add(ref);
      }
    }
  }

  // 阶段二：从模板文件提取图标使用
  const allIconTagNames = new Set<string>();
  for (const tags of iconTagNamesByBrand.values()) {
    for (const tag of tags) {
      allIconTagNames.add(tag);
    }
  }

  for (const { content } of templateFiles) {
    const foundByBrand = extractIconNamesFromTemplate(
      content, allIconNameSet, allIconTagNames, brandNameSet, defaultBrand,
    );
    for (const [brand, icons] of foundByBrand) {
      if (!iconsByBrand.has(brand)) {
        iconsByBrand.set(brand, new Set());
      }
      for (const icon of icons) {
        iconsByBrand.get(brand)!.add(icon);
      }
    }
  }

  return { iconTagNamesByBrand, singleIconRefsByBrand, iconsByBrand };
}

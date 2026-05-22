/**
 * @mp-svg-icons/utils — 文件扫描与图标识别
 *
 * 扫描项目源码中的 JSON 配置和模板文件，识别图标组件引用和使用情况。
 */

import type { ScanContext, ScanResult } from './types';
import { extractIconTagNames, collectFiles } from '../shared/scanner';
import { escapeRegExp } from '../shared/utils';

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
export function scanAllFiles(scanDirs: readonly string[], ctx: ScanContext): ScanResult {
  const { excludeDirs, allIconNameSet, iconPathRegex, brandNameSet, defaultBrand } = ctx;

  const iconsByBrand = new Map<string, Set<string>>();

  // 收集文件
  const { jsonFiles, templateFiles } = collectFiles(scanDirs, excludeDirs);

  // 阶段一：从 JSON 文件提取 icon 组件标签名
  const allIconTagNames = new Set<string>();
  for (const { content } of jsonFiles) {
    const tags = extractIconTagNames(content, iconPathRegex);
    for (const tag of tags) {
      allIconTagNames.add(tag);
    }
  }

  // 将标签名分配给所有已知品牌（品牌由模板中的 brand 属性决定）
  const iconTagNamesByBrand = new Map<string, Set<string>>();
  if (allIconTagNames.size > 0) {
    for (const brand of brandNameSet) {
      iconTagNamesByBrand.set(brand, new Set(allIconTagNames));
    }
  }

  // 阶段二：从模板文件提取图标使用
  for (const { content } of templateFiles) {
    const foundByBrand = extractIconNamesFromTemplate(
      content,
      allIconNameSet,
      allIconTagNames,
      brandNameSet,
      defaultBrand,
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

  return { iconTagNamesByBrand, iconsByBrand };
}

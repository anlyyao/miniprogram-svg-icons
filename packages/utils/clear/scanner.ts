/**
 * @mp-svg-icons/utils — 文件扫描与图标识别
 *
 * 扫描项目源码中的 JSON 配置和模板文件，识别图标组件引用和使用情况。
 */

import type { ScanContext, ScanResult } from './types';
import { collectFiles, collectIconTagNames, extractIconNamesWithBrand } from '../shared/scanner';

/**
 * 扫描所有源文件，提取图标使用信息
 */
export function scanAllFiles(scanDirs: readonly string[], ctx: ScanContext): ScanResult {
  const { excludeDirs, allIconNameSet, iconPathRegex, brandNameSet, defaultBrand } = ctx;

  const iconsByBrand = new Map<string, Set<string>>();

  // 收集文件
  const { jsonFiles, templateFiles } = collectFiles(scanDirs, excludeDirs);

  // 阶段一：从 JSON 文件提取 icon 组件标签名
  const allIconTagNames = collectIconTagNames(jsonFiles, iconPathRegex);

  // 将标签名分配给所有已知品牌（品牌由模板中的 brand 属性决定）
  const iconTagNamesByBrand = new Map<string, Set<string>>();
  if (allIconTagNames.size > 0) {
    for (const brand of brandNameSet) {
      iconTagNamesByBrand.set(brand, new Set(allIconTagNames));
    }
  }

  // 阶段二：从模板文件提取图标使用（按品牌分组）
  for (const { content } of templateFiles) {
    const foundByBrand = extractIconNamesWithBrand(
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

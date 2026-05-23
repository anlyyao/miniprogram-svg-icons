/**
 * clear — 小程序图标裁剪(主入口)
 *
 * 扫描项目源码，识别图标组件实际使用的图标，裁剪 icon/icons.js 映射表。
 *
 * 专门针对 @mp-svg-icons/xx 系列图标库：
 * @mp-svg-icons/wechat/
 *   └── icon/
 *       ├── index.js
 *       ├── index.json
 *       ├── index.wxml
 *       └── icons.js      图标 SVG 映射表 { "brand1": {...}, "brand2": {...} }
 */

import path from 'path';

import type {
  ClearOptions,
  ClearResult,
  ScanContext,
  IconDataLoadResult,
  PerformClearResult,
  BrandInfo,
  BrandIconDataLoadResult,
  BrandClearResult,
  IconsData,
  IconsOption,
} from './types';
import { escapeRegExp, formatBytes } from '../shared/utils';
import { mergeManualIcons } from '../shared/pipeline';
import { resolvePkgDir } from './path-utils';
import { scanAllFiles } from './scanner';
import { loadIconsData, clearIconsJs } from './icon';

// ======================== 品牌收集 ========================

/** 从 icons.js 数据中收集品牌列表（品牌来源于 icons.js 的顶层 key） */
function collectBrands(iconsData: IconsData | null): BrandInfo[] {
  if (!iconsData) return [];
  return Object.keys(iconsData.data).map((name) => ({ name }));
}

// ======================== 图标数据加载 ========================

/** 加载图标数据，支持多品牌，合并所有品牌的图标名 */
function loadAllIconData(brands: readonly BrandInfo[], iconsData: IconsData | null): IconDataLoadResult {
  const allIconNameSet = new Set<string>();
  const brandResults: BrandIconDataLoadResult[] = [];

  if (iconsData) {
    let totalIconCount = 0;
    for (const [brandName, icons] of Object.entries(iconsData.data)) {
      const iconCount = Object.keys(icons).length;
      totalIconCount += iconCount;
      console.log(`📦 [${brandName}] icons.js 包含 ${iconCount} 个图标`);
    }
    console.log(`📦 [合计] icons.js 共包含 ${totalIconCount} 个图标（${Object.keys(iconsData.data).length} 个品牌）`);
  } else {
    console.log(`⏭️ 未找到 icon/icons.js，跳过 SVG 图标裁剪`);
  }

  for (const brand of brands) {
    const iconNameSet = new Set<string>();
    if (iconsData?.data[brand.name]) {
      for (const name of Object.keys(iconsData.data[brand.name])) {
        iconNameSet.add(name);
        allIconNameSet.add(name);
      }
    }
    brandResults.push({ brand, iconNameSet });
  }

  return { brandResults, allIconNameSet, iconsData };
}

// ======================== 裁剪执行 ========================

/** 收集使用中的图标（区分来源：扫描 + 手动指定） */
function collectUsedIcons(
  scanDirs: readonly string[],
  icons: IconsOption,
  ctx: ScanContext,
  loadResult: IconDataLoadResult,
): Map<string, Set<string>> {
  const { allIconNameSet, brands } = ctx;
  const iconUsedByBrand = new Map<string, Set<string>>();

  for (const brand of brands) {
    iconUsedByBrand.set(brand.name, new Set());
  }

  // 步骤 1：扫描源码收集使用中的图标
  if (scanDirs.length > 0) {
    const scanResult = scanAllFiles(scanDirs, ctx);

    for (const brand of brands) {
      const iconTags = scanResult.iconTagNamesByBrand.get(brand.name);
      console.log(
        iconTags?.size
          ? `\n🏷️ [${brand.name}] 发现 icon 组件标签: ${[...iconTags].join(', ')}`
          : `\n🏷️ [${brand.name}] 未发现 icon 组件引用`,
      );
    }

    for (const [brandName, brandIcons] of scanResult.iconsByBrand) {
      if (!brandIcons.size) continue;
      const brandSet = iconUsedByBrand.get(brandName);
      if (!brandSet) continue;
      for (const icon of brandIcons) brandSet.add(icon);
    }

    for (const brand of brands) {
      const usedIcons = iconUsedByBrand.get(brand.name)!;
      console.log(
        usedIcons.size
          ? `🔍 [${brand.name}] 扫描到 ${usedIcons.size} 个图标被引用: ${[...usedIcons].sort().join(', ')}`
          : `🔍 [${brand.name}] 扫描到 0 个图标被引用`,
      );
    }
  }

  // 步骤 2：合并手动指定的图标
  const isArrayFormat = Array.isArray(icons);
  const hasManualIcons = isArrayFormat ? icons.length > 0 : Object.keys(icons).length > 0;

  if (hasManualIcons) {
    if (isArrayFormat) {
      // 数组格式：分配到对应品牌
      const allBrandUsedIcons = new Set<string>();
      for (const usedSet of iconUsedByBrand.values()) {
        for (const icon of usedSet) allBrandUsedIcons.add(icon);
      }

      const tempUsedIcons = new Set<string>(allBrandUsedIcons);
      mergeManualIcons(icons, allIconNameSet, tempUsedIcons);

      for (const icon of icons) {
        if (!allIconNameSet.has(icon)) continue;
        for (const brandResult of loadResult.brandResults) {
          if (!brandResult.iconNameSet.has(icon)) continue;
          iconUsedByBrand.get(brandResult.brand.name)?.add(icon);
        }
      }
    } else {
      // 对象格式：按品牌逐个分配
      let totalSpecified = 0;
      let totalValid = 0;

      for (const [brandName, brandIcons] of Object.entries(icons)) {
        if (!brandIcons?.length) continue;

        const brandResult = loadResult.brandResults.find((b) => b.brand.name === brandName);
        if (!brandResult) {
          console.warn(`⚠️ 手动指定的品牌不存在: ${brandName}`);
          continue;
        }

        const brandSet = iconUsedByBrand.get(brandName);
        if (!brandSet) continue;

        for (const icon of brandIcons) {
          totalSpecified++;
          if (brandResult.iconNameSet.has(icon)) {
            brandSet.add(icon);
            totalValid++;
          } else {
            console.warn(`⚠️ 手动指定的图标未找到: ${icon} (品牌: ${brandName})`);
          }
        }
      }

      console.log(`📌 手动指定 ${totalSpecified} 个图标（有效 ${totalValid} 个）`);
    }
  }

  return iconUsedByBrand;
}

/** 执行裁剪操作 */
function performClear(
  ctx: ScanContext,
  loadResult: IconDataLoadResult,
  iconUsedByBrand: Map<string, Set<string>>,
): PerformClearResult {
  const { dryRun } = ctx;
  const { iconsData } = loadResult;

  let savedBytes = 0;
  const brandResults = new Map<string, { used: string[]; removed: string[]; total: number }>();

  if (iconsData) {
    for (const [brandName, icons] of Object.entries(iconsData.data)) {
      const usedIconsForBrand = iconUsedByBrand.get(brandName) || new Set<string>();
      const iconNames = Object.keys(icons);
      const used = iconNames.filter((name) => usedIconsForBrand.has(name));
      const removed = iconNames.filter((name) => !usedIconsForBrand.has(name));
      brandResults.set(brandName, { used, removed, total: iconNames.length });
    }

    const hasRemoved = [...brandResults.values()].some((r) => r.removed.length > 0);
    if (hasRemoved) {
      console.log(`\n🗑️ ${dryRun ? '将' : '正在'}裁剪 icons.js 映射表...`);
      savedBytes = clearIconsJs(iconsData, iconUsedByBrand, dryRun);
    }
  }

  return { brandResults, savedBytes };
}

function printSummary(dryRun: boolean, clearResult: PerformClearResult): void {
  const { brandResults, savedBytes } = clearResult;

  const hasRemoved = [...brandResults.values()].some((r) => r.removed.length > 0);
  if (!hasRemoved) {
    console.log(`\n✅ 所有图标均在使用中,无需裁剪`);
    return;
  }

  console.log(`\n✅ ${dryRun ? '[预览模式] ' : ''}裁剪完成!`);

  for (const [brandName, { used, removed, total }] of brandResults) {
    console.log(`   📊 [${brandName}] 保留 ${used.length} / ${total} 个图标,移除 ${removed.length} 个`);
  }

  if (savedBytes > 0) console.log(`   💾 总计节省: ${formatBytes(savedBytes)}`);
  if (dryRun) console.log(`\n💡 移除 --dry-run 参数以执行实际裁剪`);

  for (const [brandName, { used }] of brandResults) {
    if (used.length) {
      console.log(`\n📋 [${brandName}] 保留的图标 (${used.length}):`);
      console.log(`   ${[...used].sort().join(', ')}`);
    }
  }
}

// ======================== 主函数(可编程调用) ========================

/**
 * 执行图标组件裁剪
 *
 * @example
 * ```ts
 * import { clear } from '@mp-svg-icons/utils';
 * const result = clear({
 *   scanDirs: ['./pages', './components'],
 *   icons: ['loading'],
 *   pkgDir: './miniprogram_npm/@mp-svg-icons/wechat',
 *   dryRun: false,
 * });
 * ```
 */
export function clear(options: ClearOptions): ClearResult {
  const { scanDirs, icons, pkgDir: rawPkgDir, dryRun } = options;

  if (!rawPkgDir) {
    throw new Error('--pkg-dir 为必填参数,请指定图标包目录');
  }

  // 解析并校验图标包路径
  const pkgDir = resolvePkgDir(rawPkgDir);

  console.log(`\n🚀 小程序图标裁剪`);
  console.log(`📁 图标包路径: ${pkgDir}`);
  if (dryRun) console.log(`👀 预览模式,不会修改任何文件\n`);

  // 加载 icons.js
  const iconsFilePath = path.join(pkgDir, 'icon', 'icons.js');
  const iconsData = loadIconsData(iconsFilePath);

  // 收集品牌列表（从 icons.js 数据中获取）
  const brands = collectBrands(iconsData);
  if (!brands.length) {
    throw new Error(
      `图标包目录中未找到任何品牌数据: ${pkgDir}\n` +
        '请确认 --pkg-dir 指向正确的 @mp-svg-icons/xx 图标包目录，且 icon/icons.js 文件存在',
    );
  }
  console.log(`🏷️ 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // 1. 加载图标数据
  const loadResult = loadAllIconData(brands, iconsData);
  const { allIconNameSet } = loadResult;

  if (!allIconNameSet.size) {
    throw new Error(`图标包目录中未找到任何图标组件: ${pkgDir}\n` + '请确认 --pkg-dir 指向正确的图标包构建产物目录');
  }

  // 2. 构建扫描上下文(预编译路径匹配正则,避免在循环中重复创建)
  const pkgDirName = path.basename(pkgDir);

  // 构建正则表达式，匹配 icon 通用组件路径
  // 如 wechat/icon 或 wechat/icon/index（品牌通过模板中的 brand 属性指定）
  const iconPathRegex = new RegExp(`${escapeRegExp(pkgDirName)}/${escapeRegExp('icon')}(?:/index)?$`);
  const brandNameSet = new Set(brands.map((b) => b.name));
  const defaultBrand = 'tdesign';

  const ctx: ScanContext = {
    pkgDir,
    pkgDirName,
    excludeDirs: new Set([pkgDir]),
    allIconNameSet,
    dryRun,
    brands,
    brandNameSet,
    defaultBrand,
    iconPathRegex,
  };

  // 3. 收集使用中的图标
  const iconUsedByBrand = collectUsedIcons(scanDirs, icons, ctx, loadResult);

  const hasUsedIcons = [...iconUsedByBrand.values()].some((s) => s.size > 0);
  if (!hasUsedIcons) {
    console.warn(
      '⚠️ 扫描目录中未发现任何正在使用的图标,所有图标将被移除。\n' +
        '  如果这不符合预期,可通过 --icons 参数手动指定需要保留的图标名。',
    );
  }

  const clearResult = performClear(ctx, loadResult, iconUsedByBrand);
  printSummary(dryRun, clearResult);

  const brandClearResults: BrandClearResult[] = [];
  for (const [brandName, { used, removed, total }] of clearResult.brandResults) {
    brandClearResults.push({
      brand: brandName,
      totalCount: total,
      usedIcons: [...used].sort(),
      removedIcons: [...removed].sort(),
    });
  }

  return { brands: brandClearResults, totalSavedBytes: clearResult.savedBytes };
}

export type { ClearOptions, ClearResult, BrandClearResult, IconsOption } from './types';

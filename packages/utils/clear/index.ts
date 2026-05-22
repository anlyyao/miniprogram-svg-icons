/**
 * @mp-svg-icons/utils— 小程序图标裁剪(主入口)
 *
 * 扫描项目源码,识别图标组件实际使用的图标,裁剪构建产物:
 *   1. 裁剪 icon/icons.js 映射表,只保留通用图标组件用到的图标
 *
 * 专门针对 @mp-svg-icons/xx 系列图标库：
 * @mp-svg-icons/wechat/
 *   └── icon/             图标组件
 *       ├── index.js      组件逻辑
 *       ├── index.json
 *       ├── index.wxml
 *       └── icons.js      图标 SVG 映射表 { "brand1": {...}, "brand2": {...} }
 *
 * @module
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
} from './types';
import { escapeRegExp, formatBytes } from '../shared/utils';
import { resolvePkgDir } from './path-utils';
import { scanAllFiles } from './scanner';
import { loadIconsData, clearIconsJs } from './icon';

// ======================== 品牌收集 ========================

/**
 * 从 icons.js 数据中收集品牌列表
 *
 * 品牌信息完全来源于 icons.js 的顶层 key（如 "tdesign"），
 * 包目录下不存在品牌子目录。
 */
function collectBrands(iconsData: IconsData | null): BrandInfo[] {
  if (!iconsData) return [];

  return Object.keys(iconsData.data).map((brandName) => ({
    name: brandName,
  }));
}

// ======================== 图标数据加载 ========================

/**
 * 加载图标数据
 *
 * 各组件均为可选,不存在则自动跳过。
 * 支持多品牌，合并所有品牌的图标名。
 */
function loadAllIconData(brands: readonly BrandInfo[], iconsData: IconsData | null): IconDataLoadResult {
  const allIconNameSet = new Set<string>();
  const brandResults: BrandIconDataLoadResult[] = [];

  // 从 icons.js 中加载图标数据
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

    // 从 icons.js 中获取该品牌的图标名
    if (iconsData && iconsData.data[brand.name]) {
      for (const name of Object.keys(iconsData.data[brand.name])) {
        iconNameSet.add(name);
        allIconNameSet.add(name);
      }
    }

    brandResults.push({
      brand,
      iconNameSet,
    });
  }

  return { brandResults, allIconNameSet, iconsData };
}

// ======================== 裁剪执行 ========================

/**
 * 收集使用中的图标(区分来源)
 */
function collectUsedIcons(
  scanDirs: readonly string[],
  icons: readonly string[],
  ctx: ScanContext,
  loadResult: IconDataLoadResult,
): Map<string, Set<string>> {
  const { allIconNameSet, brands } = ctx;
  const iconUsedByBrand = new Map<string, Set<string>>();

  // 初始化每个品牌的集合
  for (const brand of brands) {
    iconUsedByBrand.set(brand.name, new Set());
  }

  // 扫描源码
  if (scanDirs.length > 0) {
    const scanResult = scanAllFiles(scanDirs, ctx);

    // 日志输出扫描结果
    for (const brand of brands) {
      const brandPrefix = `[${brand.name}] `;
      const iconTags = scanResult.iconTagNamesByBrand.get(brand.name);

      if (iconTags && iconTags.size > 0) {
        console.log(`\n🏷️ ${brandPrefix}发现 icon 组件标签: ${[...iconTags].join(', ')}`);
      } else {
        console.log(`\n🏷️ ${brandPrefix}未发现 icon 组件引用`);
      }
    }

    // 收集通用组件图标（按品牌分组）
    for (const [brandName, icons] of scanResult.iconsByBrand) {
      if (icons.size > 0) {
        for (const icon of icons) {
          iconUsedByBrand.get(brandName)!.add(icon);
        }
      }
    }

    // 按品牌输出引用的图标
    for (const brand of brands) {
      const usedIcons = iconUsedByBrand.get(brand.name)!;
      if (usedIcons.size > 0) {
        console.log(`🔍 [${brand.name}] 扫描到 ${usedIcons.size} 个图标被引用: ${[...usedIcons].sort().join(', ')}`);
      } else {
        console.log(`🔍 [${brand.name}] 扫描到 0 个图标被引用`);
      }
    }
  }

  // 手动指定(根据图标包中实际存在的组件类型分别归入)
  if (icons.length > 0) {
    const validCount = icons.reduce((count, icon) => {
      if (allIconNameSet.has(icon)) {
        // 添加到所有品牌的 icon 使用集合（因为是手动指定，不区分品牌）
        for (const brandResult of loadResult.brandResults) {
          iconUsedByBrand.get(brandResult.brand.name)!.add(icon);
        }
        return count + 1;
      }
      console.warn(`⚠️ 手动指定的图标未找到: ${icon}`);
      return count;
    }, 0);
    console.log(`📌 手动指定 ${icons.length} 个图标(有效 ${validCount} 个)`);
  }

  return iconUsedByBrand;
}

/**
 * 执行实际的裁剪操作
 */
function performClear(
  ctx: ScanContext,
  loadResult: IconDataLoadResult,
  iconUsedByBrand: Map<string, Set<string>>,
): PerformClearResult {
  const { dryRun } = ctx;
  const { iconsData } = loadResult;

  let savedBytes = 0;
  const brandResults = new Map<string, { used: string[]; removed: string[]; total: number }>();

  // 按品牌计算使用/移除图标
  if (iconsData) {
    for (const [brandName, icons] of Object.entries(iconsData.data)) {
      const usedIconsForBrand = iconUsedByBrand.get(brandName) || new Set<string>();
      const iconNames = Object.keys(icons);

      const used = iconNames.filter((name) => usedIconsForBrand.has(name));
      const removed = iconNames.filter((name) => !usedIconsForBrand.has(name));

      brandResults.set(brandName, { used, removed, total: iconNames.length });
    }

    // 检查是否需要裁剪
    let hasRemoved = false;
    for (const { removed } of brandResults.values()) {
      if (removed.length > 0) {
        hasRemoved = true;
        break;
      }
    }

    if (hasRemoved) {
      const actionLabel = dryRun ? '将' : '正在';
      console.log(`\n🗑️ ${actionLabel}裁剪 icons.js 映射表...`);
      savedBytes = clearIconsJs(iconsData, iconUsedByBrand, dryRun);
    }
  }

  return { brandResults, savedBytes };
}

/**
 * 打印裁剪统计和结果汇总
 */
function printSummary(dryRun: boolean, clearResult: PerformClearResult): void {
  const { brandResults, savedBytes } = clearResult;

  // 检查是否有裁剪
  let hasRemoved = false;
  for (const { removed } of brandResults.values()) {
    if (removed.length > 0) {
      hasRemoved = true;
      break;
    }
  }

  if (!hasRemoved) {
    console.log(`\n✅ 所有图标均在使用中,无需裁剪`);
    return;
  }

  console.log(`\n✅ ${dryRun ? '[预览模式] ' : ''}裁剪完成!`);

  // 按品牌输出统计
  for (const [brandName, { used, removed, total }] of brandResults) {
    console.log(`   📊 [${brandName}] 保留 ${used.length} / ${total} 个图标,移除 ${removed.length} 个`);
  }

  if (savedBytes > 0) {
    console.log(`   💾 总计节省: ${formatBytes(savedBytes)}`);
  }

  if (dryRun) {
    console.log(`\n💡 移除 --dry-run 参数以执行实际裁剪`);
  }

  // 按品牌输出保留的图标列表
  for (const [brandName, { used }] of brandResults) {
    if (used.length > 0) {
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
  if (brands.length === 0) {
    throw new Error(
      `图标包目录中未找到任何品牌数据: ${pkgDir}\n` +
        '请确认 --pkg-dir 指向正确的 @mp-svg-icons/xx 图标包目录，且 icon/icons.js 文件存在',
    );
  }
  console.log(`🏷️ 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // 1. 加载图标数据
  const loadResult = loadAllIconData(brands, iconsData);
  const { allIconNameSet } = loadResult;

  if (allIconNameSet.size === 0) {
    throw new Error(`图标包目录中未找到任何图标组件: ${pkgDir}\n` + '请确认 --pkg-dir 指向正确的图标包构建产物目录');
  }

  // 2. 构建扫描上下文(预编译路径匹配正则,避免在循环中重复创建)
  const pkgDirName = path.basename(pkgDir);

  // 构建正则表达式，匹配 icon 通用组件路径
  // 如 wechat/icon 或 wechat/icon/index（品牌通过模板中的 brand 属性指定）
  const iconPathRegex = new RegExp(`${escapeRegExp(pkgDirName)}/${escapeRegExp('icon')}(?:/index)?$`);

  // 构建品牌名集合和默认品牌
  const brandNameSet = new Set(brands.map((b) => b.name));
  // 默认品牌：与 icon 组件的 brand 属性默认值保持一致，固定为 'tdesign'
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

  // 提前检查:如果扫描目录下没有找到任何使用中的图标,给出警告但继续执行裁剪
  let hasUsedIcons = false;
  for (const icons of iconUsedByBrand.values()) {
    if (icons.size > 0) {
      hasUsedIcons = true;
      break;
    }
  }

  if (!hasUsedIcons) {
    console.warn(
      '⚠️ 扫描目录中未发现任何正在使用的图标,所有图标将被移除。\n' +
        '  如果这不符合预期,可通过 --icons 参数手动指定需要保留的图标名。',
    );
  }

  // 4. 执行裁剪
  const clearResult = performClear(ctx, loadResult, iconUsedByBrand);

  // 5. 打印汇总
  printSummary(dryRun, clearResult);

  // 6. 构建返回结果（按品牌分组）
  const brandClearResults: BrandClearResult[] = [];
  for (const [brandName, { used, removed, total }] of clearResult.brandResults) {
    brandClearResults.push({
      brand: brandName,
      totalCount: total,
      usedIcons: [...used].sort(),
      removedIcons: [...removed].sort(),
    });
  }

  return {
    brands: brandClearResults,
    totalSavedBytes: clearResult.savedBytes,
  };
}

// 导出类型
export type { ClearOptions, ClearResult, BrandClearResult } from './types';

/**
 * @mp-svg-icons/utils— 小程序图标裁剪(主入口)
 *
 * 扫描项目源码,识别图标组件实际使用的图标,裁剪构建产物:
 *   1. 裁剪 icon/icons.js 映射表,只保留通用图标组件用到的图标
 *
 * 专门针对 @mp-svg-icons/xx 系列图标库的品牌嵌套结构：
 * @mp-svg-icons/wechat/
 *   ├── {品牌1}/
 *   ├── {品牌2}/
 *   ├── icon/             通用图标组件
 *   │   └── icons.js      合并后的图标数据 { "brand1": {...}, "brand2": {...} }
 *   └── common/           公共 Behavior
 *
 * @module
 */

import fs from 'fs';
import path from 'path';

import type {
  ClearOptions,
  ClearResult,
  ScanContext,
  IconDataLoadResult,
  PerformClearResult,
  BrandInfo,
  BrandIconDataLoadResult,
  MergedIconsData,
} from './types';
import { COMMON_DIR } from './constants';
import { escapeRegExp, formatBytes } from './utils';
import { resolvePkgDir } from './path-utils';
import { scanAllFiles } from './scanner';
import { loadMergedIconsData, clearMergedIconsJs } from './icon';
import { removeComponentDir, removeIconsFile } from './fs-utils';

// ======================== 品牌收集 ========================

/**
 * 收集品牌列表
 *
 * 扫描 pkgDir 下的所有子目录
 * 检查 icon/icons.js 中是否包含对应品牌的数据
 */
function collectBrands(pkgDir: string, mergedData: MergedIconsData | null): BrandInfo[] {
  const brands: BrandInfo[] = [];

  if (!fs.existsSync(pkgDir)) return brands;

  const entries = fs.readdirSync(pkgDir, { withFileTypes: true });

  // 从合并的 icons.js 中获取品牌名集合
  const brandNamesInIcons = mergedData ? new Set(Object.keys(mergedData.data)) : new Set<string>();

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    // 跳过 icon 和 common 目录
    if (entry.name === 'icon' || entry.name === COMMON_DIR) continue;

    const brandDir = path.join(pkgDir, entry.name);

    // 检查是否在 icons.js 中存在
    const hasIconsData = brandNamesInIcons.has(entry.name);

    if (hasIconsData) {
      brands.push({
        name: entry.name,
        dir: brandDir,
      });
    }
  }

  return brands;
}

// ======================== 图标数据加载 ========================

/**
 * 加载全量图标数据
 *
 * 各组件均为可选,不存在则自动跳过。
 * 支持多品牌，合并所有品牌的图标名。
 */
function loadAllIconData(brands: readonly BrandInfo[], mergedData: MergedIconsData | null): IconDataLoadResult {
  const allIconNameSet = new Set<string>();
  const brandResults: BrandIconDataLoadResult[] = [];

  // 从合并的 icons.js 中加载图标数据
  if (mergedData) {
    let totalIconCount = 0;
    for (const [brandName, icons] of Object.entries(mergedData.data)) {
      const iconCount = Object.keys(icons).length;
      totalIconCount += iconCount;
      console.log(`📦 [${brandName}] icons.js 包含 ${iconCount} 个图标`);
    }
    console.log(`📦 [合计] icons.js 共包含 ${totalIconCount} 个图标（${Object.keys(mergedData.data).length} 个品牌）`);
  } else {
    console.log(`⏭️ 未找到 icon/icons.js，跳过 SVG 图标裁剪`);
  }

  for (const brand of brands) {
    const iconNameSet = new Set<string>();

    // 从合并的 icons.js 中获取该品牌的图标名
    if (mergedData && mergedData.data[brand.name]) {
      for (const name of Object.keys(mergedData.data[brand.name])) {
        iconNameSet.add(name);
        allIconNameSet.add(name);
      }
    }

    brandResults.push({
      brand,
      iconNameSet,
    });
  }

  return { brandResults, allIconNameSet, mergedIconsData: mergedData };
}

// ======================== 裁剪执行 ========================

/**
 * 收集使用中的图标(区分来源)
 */
function collectUsedIcons(
  scanDirs: readonly string[],
  includeIcons: readonly string[],
  ctx: ScanContext,
  loadResult: IconDataLoadResult,
): {
  /** 按品牌分组的 icon 使用图标 */
  iconUsedByBrand: Map<string, Set<string>>;
  /** icon 通用组件是否在 usingComponents 中被引用（按品牌） */
  iconReferencedByBrand: Map<string, boolean>;
} {
  const { allIconNameSet, brands } = ctx;
  const iconUsedByBrand = new Map<string, Set<string>>();
  const iconReferencedByBrand = new Map<string, boolean>();

  // 初始化每个品牌的集合
  for (const brand of brands) {
    iconUsedByBrand.set(brand.name, new Set());
    iconReferencedByBrand.set(brand.name, false);
  }

  // 扫描源码
  if (scanDirs.length > 0) {
    const scanResult = scanAllFiles(scanDirs, ctx);

    // 按品牌分组收集结果
    for (const brand of brands) {
      const brandName = brand.name;

      // 标记通用组件是否在 usingComponents 中被引用
      const iconTags = scanResult.iconTagNamesByBrand.get(brandName);
      if (iconTags && iconTags.size > 0) {
        iconReferencedByBrand.set(brandName, true);
      }
    }

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
    // 由于 icon 通用组件路径不含品牌，需要根据模板中的 brand 属性来判断
    // 如果没有 brand 属性，extractIconNamesByTags 会自动使用 defaultBrand
    let totalIconCount = 0;
    for (const [brandName, icons] of scanResult.iconsByBrand) {
      if (icons.size > 0) {
        // 标记该品牌的 icon 被引用
        iconReferencedByBrand.set(brandName, true);
        for (const icon of icons) {
          iconUsedByBrand.get(brandName)!.add(icon);
        }
        totalIconCount += icons.size;
      }
    }

    if (totalIconCount > 0) {
      console.log(`🔍 [全量图标] 扫描到 ${totalIconCount} 个图标被引用（按品牌分组）`);
    } else {
      console.log(`🔍 [全量图标] 扫描到 0 个图标被引用`);
    }
  }

  // 手动指定(根据图标包中实际存在的组件类型分别归入)
  if (includeIcons.length > 0) {
    const validCount = includeIcons.reduce((count, icon) => {
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
    console.log(`📌 手动指定 ${includeIcons.length} 个图标(有效 ${validCount} 个)`);
  }

  return { iconUsedByBrand, iconReferencedByBrand };
}

/**
 * 执行实际的裁剪操作
 */
function performClear(
  ctx: ScanContext,
  loadResult: IconDataLoadResult,
  iconUsedByBrand: Map<string, Set<string>>,
  iconReferencedByBrand: Map<string, boolean>,
): PerformClearResult {
  const { pkgDir, dryRun } = ctx;
  const { mergedIconsData } = loadResult;

  // 汇总统计
  let totalIconSavedBytes = 0;
  let totalIconDirRemoved = false;
  let totalCommonDirRemoved = false;
  let totalCommonSavedBytes = 0;

  const allIconUsed: string[] = [];
  const allIconRemoved: string[] = [];
  const globalRemovedSet = new Set<string>();
  const usedIcons = new Set<string>();

  // 检查是否所有品牌的 icon 都未被引用（用于决定是否移除整个 icon 目录）
  let anyIconReferenced = false;
  for (const brand of ctx.brands) {
    if (iconReferencedByBrand.get(brand.name)) {
      anyIconReferenced = true;
      break;
    }
  }

  // 收集使用中的图标
  for (const icons of iconUsedByBrand.values()) {
    for (const icon of icons) usedIcons.add(icon);
  }

  // 处理合并的 icons.js（一次性裁剪所有品牌）
  if (mergedIconsData) {
    // 计算各品牌的使用/移除图标
    for (const [brandName, icons] of Object.entries(mergedIconsData.data)) {
      const usedIconsForBrand = iconUsedByBrand.get(brandName) || new Set();
      const iconNames = Object.keys(icons);

      const iconUsed = iconNames.filter((name) => usedIconsForBrand.has(name));
      const iconRemoved = iconNames.filter((name) => !usedIconsForBrand.has(name));

      allIconUsed.push(...iconUsed);
      allIconRemoved.push(...iconRemoved);

      for (const name of iconRemoved) globalRemovedSet.add(name);
    }

    if (!anyIconReferenced) {
      // 项目中未引用任何品牌的 icon 通用组件，清空整个 icons.js
      const actionLabel = dryRun ? '将' : '正在';
      console.log(`\n🗑️ ${actionLabel}清空 icons.js (项目中未引用任何品牌图标)...`);
      const result = removeIconsFile(mergedIconsData.filePath, dryRun);
      totalIconSavedBytes = result.savedBytes;
    } else if (allIconRemoved.length > 0) {
      // 裁剪 icons.js 中未使用的图标
      const actionLabel = dryRun ? '将' : '正在';
      console.log(`\n🗑️ ${actionLabel}裁剪 icons.js 映射表...`);
      totalIconSavedBytes = clearMergedIconsJs(mergedIconsData, iconUsedByBrand, dryRun);
    }
  }

  // 如果所有品牌的 icon 都未被引用，移除整个 icon 目录
  if (!anyIconReferenced) {
    const actionLabel = dryRun ? '将' : '正在';
    console.log(`\n🗑️ ${actionLabel}移除整个 icon/ 目录(项目中未引用任何品牌图标组件)...`);
    const result = removeComponentDir(pkgDir, 'icon', dryRun);
    if (result.removed) {
      totalIconDirRemoved = true;
    }
  }

  // 移除 common 公共 Behavior 目录
  if (!anyIconReferenced) {
    const actionLabel = dryRun ? '将' : '正在';
    console.log(`\n🗑️ ${actionLabel}移除 ${COMMON_DIR}/ 目录(项目中未引用 icon 组件)...`);
    const result = removeComponentDir(pkgDir, COMMON_DIR, dryRun);
    totalCommonDirRemoved = result.removed;
    totalCommonSavedBytes = result.savedBytes;
  }

  // 从全局移除集合中排除使用中的图标
  for (const name of usedIcons) globalRemovedSet.delete(name);

  return {
    iconSavedBytes: totalIconSavedBytes,
    iconDirRemoved: totalIconDirRemoved,
    commonDirRemoved: totalCommonDirRemoved,
    commonSavedBytes: totalCommonSavedBytes,
    iconUsed: allIconUsed,
    iconRemoved: allIconRemoved,
    globalRemovedSet,
    usedIcons,
  };
}

/**
 * 打印裁剪统计和结果汇总
 */
function printSummary(
  dryRun: boolean,
  loadResult: IconDataLoadResult,
  clearResult: PerformClearResult,
): void {
  const { mergedIconsData } = loadResult;
  const {
    iconUsed,
    iconRemoved,
    iconSavedBytes,
    iconDirRemoved,
    commonDirRemoved,
    commonSavedBytes,
  } = clearResult;

  const totalSavedBytes = iconSavedBytes + commonSavedBytes;

  // 计算总的图标数
  let totalIconCount = 0;
  if (mergedIconsData) {
    for (const icons of Object.values(mergedIconsData.data)) {
      totalIconCount += Object.keys(icons).length;
    }
  }

  if (iconRemoved.length === 0 && !commonDirRemoved) {
    console.log(`\n✅ 所有图标均在使用中,无需裁剪`);
    return;
  }

  console.log(`\n✅ ${dryRun ? '[预览模式] ' : ''}裁剪完成!`);
  if (totalIconCount > 0) {
    if (iconDirRemoved) {
      console.log(`   📊 [全量图标]   整个目录已移除(项目中未引用该组件),节省 ${formatBytes(iconSavedBytes)}`);
    } else {
      console.log(`   📊 [全量图标]   保留 ${iconUsed.length} / ${totalIconCount} 个图标,移除 ${iconRemoved.length} 个${iconSavedBytes > 0 ? `,节省 ${formatBytes(iconSavedBytes)}` : ''}`);
    }
  }
  console.log(`   💾 总计节省: ${formatBytes(totalSavedBytes)}`);

  if (dryRun) {
    console.log(`\n💡 移除 --dry-run 参数以执行实际裁剪`);
  }

  // 打印保留的图标列表
  console.log(`\n📋 保留的图标:`);
  if (totalIconCount > 0) {
    if (iconDirRemoved) {
      console.log(`   [全量图标]   目录已移除`);
    } else {
      console.log(`   [全量图标]   (${iconUsed.length}): ${[...iconUsed].sort().join(', ') || '无'}`);
    }
  }
}

// ======================== 主函数(可编程调用) ========================

/**
 * 执行图标组件裁剪
 *
 * @example
 * ```ts
 * import { clear } from '@mp-svg-icons/cli';
 * const result = clear({
 *   scanDirs: ['./pages', './components'],
 *   includeIcons: ['loading'],
 *   pkgDir: './miniprogram_npm/@mp-svg-icons/wechat',
 *   dryRun: false,
 * });
 * ```
 */
export function clear(options: ClearOptions): ClearResult {
  const { scanDirs, includeIcons, pkgDir: rawPkgDir, dryRun } = options;

  if (!rawPkgDir) {
    throw new Error('--pkg-dir 为必填参数,请指定图标包目录');
  }

  // 解析并校验图标包路径
  const pkgDir = resolvePkgDir(rawPkgDir);

  console.log(`\n🚀 小程序图标裁剪`);
  console.log(`📁 图标包路径: ${pkgDir}`);
  if (dryRun) console.log(`👀 预览模式,不会修改任何文件\n`);

  // 加载合并的 icons.js
  const iconsFilePath = path.join(pkgDir, 'icon', 'icons.js');
  const mergedData = loadMergedIconsData(iconsFilePath);

  // 收集品牌列表
  const brands = collectBrands(pkgDir, mergedData);
  if (brands.length === 0) {
    throw new Error(
      `图标包目录中未找到任何品牌: ${pkgDir}\n` +
      '请确认 --pkg-dir 指向正确的 @mp-svg-icons/xx 图标包目录',
    );
  }
  console.log(`🏷️ 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // 1. 加载全量图标数据
  const loadResult = loadAllIconData(brands, mergedData);
  const { allIconNameSet } = loadResult;

  if (allIconNameSet.size === 0) {
    throw new Error(
      `图标包目录中未找到任何图标组件: ${pkgDir}\n` +
      '请确认 --pkg-dir 指向正确的图标包构建产物目录',
    );
  }

  // 2. 构建扫描上下文(预编译路径匹配正则,避免在循环中重复创建)
  const pkgDirName = path.basename(pkgDir);

  // 构建正则表达式，匹配品牌嵌套结构
  // 通用组件: 包名/icon 或 包名/icon/index（品牌通过 brand 属性指定，不在路径中）
  const iconPathRegex = new RegExp(`${escapeRegExp(pkgDirName)}/${escapeRegExp('icon')}(?:/index)?$`);

  // 构建品牌名集合和默认品牌
  const brandNameSet = new Set(brands.map((b) => b.name));
  // 默认品牌：优先使用 tdesign，如果不存在则使用第一个品牌
  const defaultBrand = brandNameSet.has('tdesign') ? 'tdesign' : brands[0].name;

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
  const { iconUsedByBrand, iconReferencedByBrand } = collectUsedIcons(
    scanDirs, includeIcons, ctx, loadResult,
  );

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
  const clearResult = performClear(ctx, loadResult, iconUsedByBrand, iconReferencedByBrand);

  // 5. 打印汇总
  printSummary(dryRun, loadResult, clearResult);

  // 6. 构建返回结果
  const { usedIcons, globalRemovedSet } = clearResult;
  const totalSavedBytes = clearResult.iconSavedBytes + clearResult.commonSavedBytes;

  return {
    usedCount: usedIcons.size,
    removedCount: globalRemovedSet.size,
    totalCount: allIconNameSet.size,
    usedIcons: [...usedIcons].sort(),
    removedIcons: [...globalRemovedSet].sort(),
    totalSavedBytes,
    icon: mergedData
      ? { usedIcons: clearResult.iconUsed, removedIcons: clearResult.iconRemoved, savedBytes: clearResult.iconSavedBytes, removedDir: clearResult.iconDirRemoved }
      : null,
    common: { removedDir: clearResult.commonDirRemoved, savedBytes: clearResult.commonSavedBytes },
  };
}

// 导出类型
export type { ClearOptions, ClearResult, ComponentClearResult } from './types';

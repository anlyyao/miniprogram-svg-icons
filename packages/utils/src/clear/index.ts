/**
 * @mp-svg-icons/utils— 小程序图标裁剪(主入口)
 *
 * 扫描项目源码,识别图标组件实际使用的图标,裁剪构建产物:
 *   1. 裁剪 icon/{brand}-icons.js 映射表,只保留通用图标组件用到的图标
 *   2. 移除未使用的单图标组件目录(如 add-icon/、close-icon/ 等,可选)
 *
 * 专门针对 @mp-svg-icons/xx 系列图标库的品牌嵌套结构：
 * @mp-svg-icons/wechat/
 *   ├── {品牌1}/          单图标组件目录
 *   ├── {品牌2}/
 *   ├── icon/             通用图标组件
 *   │   ├── {品牌1}-icons.js
 *   │   └── {品牌2}-icons.js
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
  IconData,
  PerformClearResult,
  BrandInfo,
  BrandIconDataLoadResult,
} from './types';
import { SINGLE_ICON_SUFFIX, COMMON_DIR } from './constants';
import { escapeRegExp, formatBytes } from './utils';
import { resolvePkgDir, stripIconSuffix } from './path-utils';
import { scanAllFiles } from './scanner';
import { loadIconsDataForBrand, clearIconsJs } from './icon';
import { collectSingleIconDirsForBrand, removeUnusedSingleIconDirs, removeComponentDir, removeIconsFile } from './single-icon';

// ======================== 品牌收集 ========================

/**
 * 收集品牌列表
 *
 * 扫描 pkgDir 下的所有子目录，检查是否包含单图标组件
 * 同时检查 icon/ 目录下是否存在对应的 {brand}-icons.js 文件
 */
function collectBrands(pkgDir: string): BrandInfo[] {
  const brands: BrandInfo[] = [];
  const iconDir = path.join(pkgDir, 'icon');

  if (!fs.existsSync(pkgDir)) return brands;

  const entries = fs.readdirSync(pkgDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    // 跳过 icon 和 common 目录
    if (entry.name === 'icon' || entry.name === COMMON_DIR) continue;

    const brandDir = path.join(pkgDir, entry.name);
    const subEntries = fs.readdirSync(brandDir, { withFileTypes: true });

    // 检查是否包含单图标组件
    const hasSingleIconComponents = subEntries.some(
      (sub) => sub.isDirectory() && sub.name.endsWith(SINGLE_ICON_SUFFIX),
    );

    // 检查是否存在对应的 icons 文件
    const iconsFilePath = path.join(iconDir, `${entry.name}-icons.js`);
    const hasIconsFile = fs.existsSync(iconsFilePath);

    if (hasSingleIconComponents || hasIconsFile) {
      brands.push({
        name: entry.name,
        dir: brandDir,
        iconsFilePath,
      });
    }
  }

  return brands;
}

// ======================== 图标数据加载 ========================

/**
 * 加载全量图标数据(icon + 单图标组件)
 *
 * 各组件均为可选,不存在则自动跳过。
 * 支持多品牌，合并所有品牌的图标名。
 */
function loadAllIconData(brands: readonly BrandInfo[]): IconDataLoadResult {
  const allIconNameSet = new Set<string>();
  const brandResults: BrandIconDataLoadResult[] = [];

  for (const brand of brands) {
    const brandPrefix = `[${brand.name}] `;

    // 1. 读取 {brand}-icons.js(可选)
    const iconData = loadIconsDataForBrand(brand);
    const iconNameSet = new Set<string>();

    if (iconData) {
      for (const name of iconData.names) {
        iconNameSet.add(name);
        allIconNameSet.add(name);
      }
      console.log(`📦 ${brandPrefix}${path.basename(brand.iconsFilePath)} 包含 ${iconData.names.length} 个图标`);
    } else {
      console.log(`⏭️ ${brandPrefix}未找到 ${path.basename(brand.iconsFilePath)},跳过 SVG 图标裁剪`);
    }

    // 2. 收集单图标组件目录(可选)
    const singleIconDirs = collectSingleIconDirsForBrand(brand);
    for (const dirName of singleIconDirs) {
      const iconName = stripIconSuffix(dirName);
      iconNameSet.add(iconName);
      allIconNameSet.add(iconName);
    }

    if (singleIconDirs.length > 0) {
      console.log(`📦 ${brandPrefix}单图标组件: ${singleIconDirs.length} 个`);
    } else {
      console.log(`⏭️ ${brandPrefix}未找到单图标组件`);
    }

    brandResults.push({
      brand,
      iconData,
      singleIconDirs,
      iconNameSet,
    });
  }

  return { brandResults, allIconNameSet };
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
  /** 按品牌分组的单图标组件使用图标 */
  singleUsedByBrand: Map<string, Set<string>>;
  /** icon 通用组件是否在 usingComponents 中被引用（按品牌） */
  iconReferencedByBrand: Map<string, boolean>;
} {
  const { allIconNameSet, brands, defaultBrand } = ctx;
  const iconUsedByBrand = new Map<string, Set<string>>();
  const singleUsedByBrand = new Map<string, Set<string>>();
  const iconReferencedByBrand = new Map<string, boolean>();

  // 初始化每个品牌的集合
  for (const brand of brands) {
    iconUsedByBrand.set(brand.name, new Set());
    singleUsedByBrand.set(brand.name, new Set());
    iconReferencedByBrand.set(brand.name, false);
  }

  // 扫描源码
  if (scanDirs.length > 0) {
    const scanResult = scanAllFiles(scanDirs, ctx);

    // 按品牌分组收集结果
    for (const brand of brands) {
      const brandName = brand.name;

      // 收集单图标组件引用
      const singleRefs = scanResult.singleIconRefsByBrand.get(brandName);
      if (singleRefs) {
        for (const ref of singleRefs) {
          singleUsedByBrand.get(brandName)!.add(ref);
        }
      }

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
      const singleRefs = scanResult.singleIconRefsByBrand.get(brand.name);

      if (iconTags && iconTags.size > 0) {
        console.log(`\n🏷️ ${brandPrefix}发现 icon 组件标签: ${[...iconTags].join(', ')}`);
      } else {
        console.log(`\n🏷️ ${brandPrefix}未发现 icon 组件引用`);
      }
      if (singleRefs && singleRefs.size > 0) {
        console.log(`🔗 ${brandPrefix}发现 ${singleRefs.size} 个单图标组件引用`);
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
          if (brandResult.iconData) {
            iconUsedByBrand.get(brandResult.brand.name)!.add(icon);
          }
        }
        return count + 1;
      }
      console.warn(`⚠️ 手动指定的图标未找到: ${icon}`);
      return count;
    }, 0);
    console.log(`📌 手动指定 ${includeIcons.length} 个图标(有效 ${validCount} 个)`);
  }

  return { iconUsedByBrand, singleUsedByBrand, iconReferencedByBrand };
}

/**
 * 执行实际的裁剪操作
 */
function performClear(
  ctx: ScanContext,
  loadResult: IconDataLoadResult,
  iconUsedByBrand: Map<string, Set<string>>,
  singleUsedByBrand: Map<string, Set<string>>,
  iconReferencedByBrand: Map<string, boolean>,
): PerformClearResult {
  const { pkgDir, dryRun } = ctx;
  const { brandResults } = loadResult;

  // 汇总统计
  let totalIconSavedBytes = 0;
  let totalIconDirRemoved = false;
  let totalRemovedDirCount = 0;
  let totalSingleSavedBytes = 0;
  let totalCommonDirRemoved = false;
  let totalCommonSavedBytes = 0;

  const allIconUsed: string[] = [];
  const allIconRemoved: string[] = [];
  const allSingleIconUsed: string[] = [];
  const allSingleIconRemoved: string[] = [];
  const allUnusedDirs: string[] = [];
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

  // 检查是否所有品牌的单图标组件都未被使用
  let anySingleIconUsed = false;
  for (const icons of singleUsedByBrand.values()) {
    if (icons.size > 0) {
      anySingleIconUsed = true;
      break;
    }
  }

  for (const brandResult of brandResults) {
    const { brand, iconData, singleIconDirs } = brandResult;
    const brandPrefix = `[${brand.name}] `;

    const iconUsedIcons = iconUsedByBrand.get(brand.name)!;
    const singleUsedIcons = singleUsedByBrand.get(brand.name)!;
    const iconReferenced = iconReferencedByBrand.get(brand.name)!;

    // 合并所有来源的使用图标
    for (const icon of iconUsedIcons) usedIcons.add(icon);
    for (const icon of singleUsedIcons) usedIcons.add(icon);

    // 按组件分别计算使用/移除的图标

    // icon
    const iconUsed = iconData
      ? iconData.names.filter((name) => iconUsedIcons.has(name))
      : [];
    const iconRemoved = iconData
      ? iconData.names.filter((name) => !iconUsedIcons.has(name))
      : [];

    allIconUsed.push(...iconUsed);
    allIconRemoved.push(...iconRemoved);

    // 单图标组件
    const singleIconUsed = singleIconDirs
      .filter((dir) => singleUsedIcons.has(stripIconSuffix(dir)))
      .map(stripIconSuffix);
    const singleIconRemoved = singleIconDirs
      .filter((dir) => !singleUsedIcons.has(stripIconSuffix(dir)))
      .map(stripIconSuffix);
    const unusedDirs = singleIconDirs.filter(
      (dir) => !singleUsedIcons.has(stripIconSuffix(dir)),
    );

    allSingleIconUsed.push(...singleIconUsed);
    allSingleIconRemoved.push(...singleIconRemoved);
    allUnusedDirs.push(...unusedDirs.map((d) => `${brand.name}/${d}`));

    // 收集全局移除的图标
    for (const name of iconRemoved) globalRemovedSet.add(name);
    for (const name of singleIconRemoved) globalRemovedSet.add(name);

    // 裁剪 icon
    let iconSavedBytes = 0;
    if (iconData && iconRemoved.length > 0) {
      const actionLabel = dryRun ? '将' : '正在';
      if (!iconReferenced && iconUsedIcons.size === 0) {
        // 项目中未引用该品牌的 icon 通用组件,清空对应的 icons 文件
        console.log(`\n🗑️ ${brandPrefix}${actionLabel}清空 ${path.basename(brand.iconsFilePath)}(项目中未引用该品牌图标)...`);
        const result = removeIconsFile(brand.iconsFilePath, dryRun);
        iconSavedBytes = result.savedBytes;
      } else {
        // 组件被引用,仅裁剪映射表中未使用的图标
        console.log(`\n🗑️ ${brandPrefix}${actionLabel}裁剪 ${path.basename(brand.iconsFilePath)} 映射表...`);
        iconSavedBytes = clearIconsJs(iconData.data, iconData.filePath, iconUsedIcons, iconData.originalSize, dryRun);
      }
    }

    totalIconSavedBytes += iconSavedBytes;

    // 移除未使用的单图标组件目录
    let removedDirCount = 0;
    let singleSavedBytes = 0;
    if (unusedDirs.length > 0) {
      const actionLabel = dryRun ? '将' : '正在';
      console.log(`\n🗑️ ${brandPrefix}${actionLabel}移除 ${unusedDirs.length} 个未使用的单图标组件目录...`);
      const result = removeUnusedSingleIconDirs(brand.dir, unusedDirs, dryRun);
      removedDirCount = result.removed;
      singleSavedBytes = result.savedBytes;
    }

    totalRemovedDirCount += removedDirCount;
    totalSingleSavedBytes += singleSavedBytes;
  }

  // 如果所有品牌的 icon 都未被引用，移除整个 icon 目录
  if (!anyIconReferenced) {
    const actionLabel = dryRun ? '将' : '正在';
    console.log(`\n🗑️ ${actionLabel}移除整个 icon/ 目录(项目中未引用任何品牌图标组件)...`);
    const result = removeComponentDir(pkgDir, 'icon', dryRun);
    if (result.removed) {
      totalIconDirRemoved = true;
      // 注意：这里不重复计算 savedBytes，因为各品牌的 icons 文件已经计入
    }
  }

  // 移除 common 公共 Behavior 目录
  if (!anyIconReferenced && !anySingleIconUsed) {
    const actionLabel = dryRun ? '将' : '正在';
    console.log(`\n🗑️ ${actionLabel}移除 ${COMMON_DIR}/ 目录(项目中未引用 icon 和单图标组件)...`);
    const result = removeComponentDir(pkgDir, COMMON_DIR, dryRun);
    totalCommonDirRemoved = result.removed;
    totalCommonSavedBytes = result.savedBytes;
  }

  // 从全局移除集合中排除使用中的图标
  for (const name of usedIcons) globalRemovedSet.delete(name);

  return {
    iconSavedBytes: totalIconSavedBytes,
    iconDirRemoved: totalIconDirRemoved,
    removedDirCount: totalRemovedDirCount,
    singleSavedBytes: totalSingleSavedBytes,
    commonDirRemoved: totalCommonDirRemoved,
    commonSavedBytes: totalCommonSavedBytes,
    iconUsed: allIconUsed,
    iconRemoved: allIconRemoved,
    singleIconUsed: allSingleIconUsed,
    singleIconRemoved: allSingleIconRemoved,
    unusedDirs: allUnusedDirs,
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
  const { brandResults } = loadResult;
  const {
    iconUsed,
    iconRemoved,
    singleIconUsed,
    unusedDirs,
    iconSavedBytes,
    iconDirRemoved,
    removedDirCount,
    singleSavedBytes,
    commonDirRemoved,
    commonSavedBytes,
  } = clearResult;

  const totalSavedBytes = iconSavedBytes + singleSavedBytes + commonSavedBytes;

  // 计算总的图标数和单图标组件数
  let totalIconCount = 0;
  let totalSingleIconCount = 0;
  for (const brandResult of brandResults) {
    if (brandResult.iconData) {
      totalIconCount += brandResult.iconData.names.length;
    }
    totalSingleIconCount += brandResult.singleIconDirs.length;
  }

  if (iconRemoved.length === 0 && unusedDirs.length === 0 && !commonDirRemoved) {
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
  console.log(`   📊 [单图标组件] 保留 ${singleIconUsed.length} / ${totalSingleIconCount} 个目录,移除 ${removedDirCount} 个${removedDirCount > 0 ? `,节省 ${formatBytes(singleSavedBytes)}` : ''}`);
  console.log(`   💾 总计节省: ${formatBytes(totalSavedBytes)}`);

  if (dryRun) {
    console.log(`\n💡 移除 --dry-run 参数以执行实际裁剪`);
  }

  // 打印保留的图标分类列表
  console.log(`\n📋 保留的图标:`);
  if (totalIconCount > 0) {
    if (iconDirRemoved) {
      console.log(`   [全量图标]   目录已移除`);
    } else {
      console.log(`   [全量图标]   (${iconUsed.length}): ${[...iconUsed].sort().join(', ') || '无'}`);
    }
  }
  console.log(`   [单图标组件] (${singleIconUsed.length}): ${[...singleIconUsed].sort().join(', ') || '无'}`);
}

// ======================== 主函数(可编程调用) ========================

/**
 * 执行图标组件裁剪(icon + 单图标组件)
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

  // 收集品牌列表
  const brands = collectBrands(pkgDir);
  if (brands.length === 0) {
    throw new Error(
      `图标包目录中未找到任何品牌: ${pkgDir}\n` +
      '请确认 --pkg-dir 指向正确的 @mp-svg-icons/xx 图标包目录',
    );
  }
  console.log(`🏷️ 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // 仅指定 --icons 而未指定 --scan 时,单图标组件目录无法通过 usingComponents 扫描来保护
  if (scanDirs.length === 0 && includeIcons.length > 0) {
    console.warn('⚠️ 未指定 --scan 目录,单图标组件目录将不受 --icons 保护,会被全部移除');
  }

  // 1. 加载全量图标数据
  const loadResult = loadAllIconData(brands);
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

  // 单图标组件: 包名/{品牌}/{name}-icon
  const singleIconPathRegex = new RegExp(`${escapeRegExp(pkgDirName)}/([^/]+)/([a-z][a-z0-9-]*)${escapeRegExp(SINGLE_ICON_SUFFIX)}(?:/index)?$`);

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
    singleIconPathRegex,
  };

  // 3. 收集使用中的图标
  const { iconUsedByBrand, singleUsedByBrand, iconReferencedByBrand } = collectUsedIcons(
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
    for (const icons of singleUsedByBrand.values()) {
      if (icons.size > 0) {
        hasUsedIcons = true;
        break;
      }
    }
  }

  if (!hasUsedIcons) {
    console.warn(
      '⚠️ 扫描目录中未发现任何正在使用的图标,所有图标将被移除。\n' +
      '  如果这不符合预期,可通过 --icons 参数手动指定需要保留的图标名。',
    );
  }

  // 4. 执行裁剪
  const clearResult = performClear(ctx, loadResult, iconUsedByBrand, singleUsedByBrand, iconReferencedByBrand);

  // 5. 打印汇总
  printSummary(dryRun, loadResult, clearResult);

  // 6. 构建返回结果
  const { usedIcons, globalRemovedSet } = clearResult;
  const totalSavedBytes = clearResult.iconSavedBytes + clearResult.singleSavedBytes + clearResult.commonSavedBytes;

  // 计算总的 iconData（合并所有品牌）
  let hasIconData = false;
  for (const brandResult of loadResult.brandResults) {
    if (brandResult.iconData) {
      hasIconData = true;
      break;
    }
  }

  return {
    usedCount: usedIcons.size,
    removedCount: globalRemovedSet.size,
    totalCount: allIconNameSet.size,
    usedIcons: [...usedIcons].sort(),
    removedIcons: [...globalRemovedSet].sort(),
    totalSavedBytes,
    icon: hasIconData
      ? { usedIcons: clearResult.iconUsed, removedIcons: clearResult.iconRemoved, savedBytes: clearResult.iconSavedBytes, removedDir: clearResult.iconDirRemoved }
      : null,
    singleIcon: {
      usedIcons: clearResult.singleIconUsed,
      removedIcons: clearResult.singleIconRemoved,
      removedDirs: clearResult.removedDirCount,
      savedBytes: clearResult.singleSavedBytes,
    },
    common: { removedDir: clearResult.commonDirRemoved, savedBytes: clearResult.commonSavedBytes },
  };
}

// 导出类型
export type { ClearOptions, ClearResult, ComponentClearResult } from './types';

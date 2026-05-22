/**
 * @mp-svg-icons/utils — iconfont 图标裁剪(主入口)
 *
 * 扫描项目源码，识别 iconfont 图标组件实际使用的图标，裁剪 CSS 中未使用的图标规则。
 *
 * 支持的 iconfont 图标组件库（如 tdesign-miniprogram、@vant/weapp 等）：
 *   npm 包目录结构：
 *     tdesign-miniprogram/           ← --pkg-dir 指向此处
 *       └── icon/                    ← 工具自动检测
 *             ├── icon.js        组件逻辑
 *             ├── icon.json
 *             ├── icon.wxml
 *             └── icon.wxss      样式文件（包含图标 CSS 规则）
 *
 *   CSS 规则格式：
 *     .prefix-iconName:before{content:'\EXXXX';}
 *
 * 裁剪目标：移除样式文件中未使用图标的 CSS 规则，减小包体积。
 *
 * @module
 */

import path from 'path';

import type { IconfontClearOptions, IconfontClearResult, IconfontScanContext, IconfontCssData } from './types';
import { escapeRegExp } from '../shared/utils';
import { mergeManualIcons, warnIfNoUsedIcons, computeClearLists, printClearSummary } from '../shared/pipeline';
import { resolvePkgDir, detectIconDir } from './path-utils';
import { scanAllFiles } from './scanner';
import { loadIconfontCss, clearIconfontCss } from './css';

/** 执行 iconfont 图标裁剪 */
export function iconfontClear(options: IconfontClearOptions): IconfontClearResult {
  const { scanDirs, icons, pkgDir: rawPkgDir, dryRun } = options;

  if (!rawPkgDir) {
    throw new Error('--pkg-dir 为必填参数，请指定 iconfont 组件库的 npm 包目录');
  }

  // 解析并校验 npm 包目录路径
  const pkgDir = resolvePkgDir(rawPkgDir);

  console.log(`\n🚀 iconfont 图标裁剪`);
  console.log(`📁 npm 包目录: ${pkgDir}`);
  if (dryRun) console.log(`👀 预览模式，不会修改任何文件\n`);

  const iconDirInfo = detectIconDir(pkgDir);
  if (!iconDirInfo) {
    throw new Error(
      `npm 包目录中未找到 icon 组件目录或样式文件: ${pkgDir}\n` +
        '请确认 --pkg-dir 指向正确的 npm 包目录（如 tdesign-miniprogram）',
    );
  }

  const { iconDir, cssFilePath } = iconDirInfo;
  console.log(`📂 icon 组件目录: ${path.basename(iconDir)}/`);
  console.log(`📄 样式文件: ${path.basename(iconDir)}/${path.basename(cssFilePath)}`);

  const cssData: IconfontCssData | null = loadIconfontCss(cssFilePath);
  if (!cssData) {
    throw new Error(
      `无法解析样式文件中的 iconfont 图标规则: ${cssFilePath}\n` +
        '请确认该文件包含 .prefix-iconName:before{content:...} 格式的图标定义',
    );
  }

  const { prefix, iconRules } = cssData;
  console.log(`🏷️ 检测到 CSS 前缀: ${prefix}`);
  console.log(`📦 共包含 ${iconRules.size} 个图标规则\n`);

  const allIconNameSet = new Set(iconRules.keys());

  const pkgBaseName = path.basename(pkgDir);
  const iconDirBaseName = path.basename(iconDir);
  const iconPathRegex = new RegExp(
    `${escapeRegExp(pkgBaseName)}/${escapeRegExp(iconDirBaseName)}(?:/(?:icon|index))?$`,
  );

  const ctx: IconfontScanContext = {
    pkgDir,
    excludeDirs: new Set([pkgDir]),
    allIconNameSet,
    dryRun,
    prefix,
    iconPathRegex,
  };

  // 1. 扫描源码收集使用中的图标
  const usedIcons = new Set<string>();

  if (scanDirs.length > 0) {
    const scanResult = scanAllFiles(scanDirs, ctx);

    if (scanResult.iconTagNames.size > 0) {
      console.log(`🏷️ 发现 icon 组件标签: ${[...scanResult.iconTagNames].join(', ')}`);
    } else {
      console.log(`🏷️ 未发现 icon 组件引用`);
    }

    for (const icon of scanResult.usedIcons) {
      usedIcons.add(icon);
    }

    console.log(`🔍 扫描到 ${usedIcons.size} 个图标被引用: ${[...usedIcons].sort().join(', ')}`);
  }

  // 2. 合并手动指定的图标（复用共享逻辑）
  mergeManualIcons(icons, allIconNameSet, usedIcons);

  // 3. 检查无图标使用警告（复用共享逻辑）
  warnIfNoUsedIcons(usedIcons);

  // 4. 计算保留/移除列表（复用共享逻辑）
  const allIconNames = [...iconRules.keys()];
  const { usedList, removedList } = computeClearLists(allIconNames, usedIcons);

  if (removedList.length === 0) {
    console.log(`\n✅ 所有图标均在使用中，无需裁剪`);
    return {
      pkgDir,
      cssPrefix: prefix,
      totalCount: iconRules.size,
      usedIcons: usedList.sort(),
      removedIcons: [],
      savedBytes: 0,
    };
  }

  // 5. 执行裁剪
  const actionLabel = dryRun ? '将' : '正在';
  console.log(`\n🗑️ ${actionLabel}裁剪样式文件...`);
  const savedBytes = clearIconfontCss(cssData, usedIcons, dryRun);

  // 6. 打印汇总（复用共享逻辑）
  printClearSummary({
    dryRun,
    totalCount: iconRules.size,
    usedList,
    removedList,
    savedBytes,
  });

  return {
    pkgDir,
    cssPrefix: prefix,
    totalCount: iconRules.size,
    usedIcons: usedList.sort(),
    removedIcons: removedList.sort(),
    savedBytes,
  };
}

export type { IconfontClearOptions, IconfontClearResult } from './types';

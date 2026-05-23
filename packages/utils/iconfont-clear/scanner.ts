/**
 * iconfont-clear — 源码扫描器
 *
 * 扫描源码中 iconfont 图标组件的使用情况。
 */

import type { IconfontScanContext, IconfontScanResult } from './types';
import { collectFiles, collectIconTagNames, extractIconNamesSimple } from '../shared/scanner';

/** 扫描所有源文件，提取 iconfont 图标使用信息 */
export function scanAllFiles(scanDirs: readonly string[], ctx: IconfontScanContext): IconfontScanResult {
  const { excludeDirs, allIconNameSet, iconPathRegex } = ctx;

  const usedIcons = new Set<string>();
  const { jsonFiles, templateFiles } = collectFiles(scanDirs, excludeDirs);

  // 阶段一：从 JSON 文件提取 icon 组件标签名
  const iconTagNames = collectIconTagNames(jsonFiles, iconPathRegex);

  // 阶段二：从模板文件提取图标使用
  for (const { content } of templateFiles) {
    for (const icon of extractIconNamesSimple(content, allIconNameSet, iconTagNames)) {
      usedIcons.add(icon);
    }
  }

  return { iconTagNames, usedIcons };
}

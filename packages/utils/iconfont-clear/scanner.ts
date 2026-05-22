/**
 * @mp-svg-icons/utils — iconfont 文件扫描与图标识别
 *
 * 扫描项目源码中的 JSON 配置和模板文件，识别 iconfont 图标组件引用和使用情况。
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
    const found = extractIconNamesSimple(content, allIconNameSet, iconTagNames);
    for (const icon of found) {
      usedIcons.add(icon);
    }
  }

  return { iconTagNames, usedIcons };
}

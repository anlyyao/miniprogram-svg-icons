/**
 * @mp-svg-icons/utils — iconfont 文件扫描与图标识别
 *
 * 扫描项目源码中的 JSON 配置和模板文件，识别 iconfont 图标组件引用和使用情况。
 */

import type { IconfontScanContext, IconfontScanResult } from './types';
import { extractIconTagNames, collectFiles } from '../shared/scanner';

/** 从模板内容中提取图标名称 */
function extractIconNamesFromTemplate(content: string, allIconNames: Set<string>, tagNames: Set<string>): Set<string> {
  const found = new Set<string>();
  if (tagNames.size === 0) return found;

  const tagPattern = [...tagNames].map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const tagRegex = new RegExp(`<(?:${tagPattern})\\b([^<]*?)(?:/>|>)`, 'gi');
  const nameAttrRegex = /\bname\s*=\s*["']([a-z][a-z0-9-]*)["']/gi;

  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = tagRegex.exec(content)) !== null) {
    const attrs = tagMatch[1];

    let attrMatch: RegExpExecArray | null;
    while ((attrMatch = nameAttrRegex.exec(attrs)) !== null) {
      const iconName = attrMatch[1];
      if (allIconNames.has(iconName)) {
        found.add(iconName);
      }
    }
    nameAttrRegex.lastIndex = 0;
  }

  return found;
}

/** 扫描所有源文件，提取 iconfont 图标使用信息 */
export function scanAllFiles(scanDirs: readonly string[], ctx: IconfontScanContext): IconfontScanResult {
  const { excludeDirs, allIconNameSet, iconPathRegex } = ctx;

  const usedIcons = new Set<string>();
  const { jsonFiles, templateFiles } = collectFiles(scanDirs, excludeDirs);

  const iconTagNames = new Set<string>();
  for (const { content } of jsonFiles) {
    const tags = extractIconTagNames(content, iconPathRegex);
    for (const tag of tags) {
      iconTagNames.add(tag);
    }
  }

  for (const { content } of templateFiles) {
    const found = extractIconNamesFromTemplate(content, allIconNameSet, iconTagNames);
    for (const icon of found) {
      usedIcons.add(icon);
    }
  }

  return { iconTagNames, usedIcons };
}

/**
 * iconfont-clear — 路径工具函数
 */

import fs from 'fs';
import path from 'path';

export { isExcluded, walkDir } from '../shared/utils';
import { resolvePkgDir as sharedResolvePkgDir } from '../shared/utils';

/** 解析并校验 --pkg-dir 指定的 npm 包路径 */
export function resolvePkgDir(pkgDir: string): string {
  return sharedResolvePkgDir(pkgDir, 'npm 包目录');
}

const ICON_DIR_NAMES = ['icon', 'icons'];

/** 自动检测 icon 组件目录及样式文件路径 */
export function detectIconDir(pkgDir: string): { iconDir: string; cssFilePath: string } | null {
  const styleExtensions = ['.wxss', '.acss', '.css', '.ttss'];
  const baseNames = ['icon', 'index'];

  for (const dirName of ICON_DIR_NAMES) {
    const iconDir = path.join(pkgDir, dirName);
    try {
      if (!fs.statSync(iconDir).isDirectory()) continue;
    } catch {
      continue;
    }

    for (const baseName of baseNames) {
      for (const ext of styleExtensions) {
        const filePath = path.join(iconDir, `${baseName}${ext}`);
        if (fs.existsSync(filePath)) return { iconDir, cssFilePath: filePath };
      }
    }
  }

  return null;
}

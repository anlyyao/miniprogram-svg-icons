/**
 * @mp-svg-icons/utils — iconfont 路径工具函数
 */

import fs from 'fs';
import path from 'path';

export { isExcluded, walkDir } from '../shared/utils';
import { resolveDir } from '../shared/utils';

/** 解析并校验 --pkg-dir 路径 */
export function resolvePkgDir(pkgDir: string): string {
  return resolveDir(pkgDir, 'npm 包目录');
}

/** icon 组件子目录候选名 */
const ICON_DIR_NAMES = ['icon', 'icons'];

/** 自动检测 icon 组件目录及其中的 CSS 样式文件 */
export function detectIconDir(pkgDir: string): { iconDir: string; cssFilePath: string } | null {
  const styleExtensions = ['.wxss', '.acss', '.css', '.ttss'];
  const baseNames = ['icon', 'index'];

  for (const dirName of ICON_DIR_NAMES) {
    const iconDir = path.join(pkgDir, dirName);
    if (!fs.existsSync(iconDir) || !fs.statSync(iconDir).isDirectory()) {
      continue;
    }
    for (const baseName of baseNames) {
      for (const ext of styleExtensions) {
        const filePath = path.join(iconDir, `${baseName}${ext}`);
        if (fs.existsSync(filePath)) {
          return { iconDir, cssFilePath: filePath };
        }
      }
    }
  }

  return null;
}

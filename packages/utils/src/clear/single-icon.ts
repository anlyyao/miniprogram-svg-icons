/**
 * @mp-svg-icons/utils— 单图标组件目录清理
 */

import fs from 'fs';
import path from 'path';

import type { BrandInfo } from './types';
import { SINGLE_ICON_SUFFIX } from './constants';

/**
 * 扫描指定目录下的单图标组件目录，收集所有图标名称
 *
 * 单图标组件目录命名规则：{icon-name}-icon/（如 add-icon/、close-icon/）
 * 通用图标组件目录名为 icon（不以 -icon 结尾），因此不会被误识别
 *
 * @param dir 要扫描的目录（品牌目录）
 */
export function collectSingleIconDirsInDir(dir: string): string[] {
  const iconDirs: string[] = [];

  if (!fs.existsSync(dir)) return iconDirs;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!entry.name.endsWith(SINGLE_ICON_SUFFIX)) continue;
    iconDirs.push(entry.name);
  }

  return iconDirs;
}

/**
 * 收集品牌下的单图标组件目录
 *
 * @param brand 品牌信息
 * @returns 单图标组件目录名列表
 */
export function collectSingleIconDirsForBrand(brand: BrandInfo): string[] {
  return collectSingleIconDirsInDir(brand.dir);
}

/**
 * 移除未使用的单图标组件目录
 *
 * @param baseDir 基础目录（品牌目录）
 * @param unusedDirs 未使用的目录名列表（已筛选）
 * @param dryRun 是否为预览模式
 * @returns { removed: number, savedBytes: number }
 */
export function removeUnusedSingleIconDirs(
  baseDir: string,
  unusedDirs: readonly string[],
  dryRun: boolean,
): { removed: number; savedBytes: number } {
  let removed = 0;
  let savedBytes = 0;

  for (const dirName of unusedDirs) {
    const dirPath = path.join(baseDir, dirName);
    const dirSize = getDirSize(dirPath);

    if (dryRun) {
      removed++;
      savedBytes += dirSize;
    } else {
      try {
        fs.rmSync(dirPath, { recursive: true, force: true });
        removed++;
        savedBytes += dirSize;
      } catch {
        console.warn(`⚠️ 删除失败: ${dirName}`);
      }
    }
  }

  return { removed, savedBytes };
}

/**
 * 移除整个目录（通用组件目录 icon 等）
 *
 * @param baseDir 基础目录（包根目录）
 * @param dirName 要移除的目录名
 * @param dryRun 是否为预览模式
 * @returns { removed: boolean, savedBytes: number }
 */
export function removeComponentDir(
  baseDir: string,
  dirName: string,
  dryRun: boolean,
): { removed: boolean; savedBytes: number } {
  const dirPath = path.join(baseDir, dirName);

  if (!fs.existsSync(dirPath)) {
    return { removed: false, savedBytes: 0 };
  }

  const dirSize = getDirSize(dirPath);

  if (dryRun) {
    return { removed: true, savedBytes: dirSize };
  }

  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
    return { removed: true, savedBytes: dirSize };
  } catch {
    console.warn(`⚠️ 删除目录失败: ${dirName}`);
    return { removed: false, savedBytes: 0 };
  }
}

/**
 * 清空品牌的 icons 文件内容（保留文件结构）
 * @param filePath 文件路径
 * @param dryRun 是否为预览模式
 * @returns { removed: boolean, savedBytes: number }
 */
export function removeIconsFile(
  filePath: string,
  dryRun: boolean,
): { removed: boolean; savedBytes: number } {
  if (!fs.existsSync(filePath)) {
    return { removed: false, savedBytes: 0 };
  }

  const emptyContent = 'module.exports = {};';
  const emptyContentSize = Buffer.byteLength(emptyContent, 'utf8');

  let originalSize = 0;
  try {
    originalSize = fs.statSync(filePath).size;
  } catch {
    // ignore
  }

  // 计算节省的字节数（原始大小 - 空内容大小）
  const savedBytes = Math.max(0, originalSize - emptyContentSize);

  if (dryRun) {
    return { removed: true, savedBytes };
  }

  try {
    fs.writeFileSync(filePath, emptyContent, 'utf8');
    return { removed: true, savedBytes };
  } catch {
    console.warn(`⚠️ 清空文件失败: ${filePath}`);
    return { removed: false, savedBytes: 0 };
  }
}

function getDirSize(dirPath: string): number {
  if (!fs.existsSync(dirPath)) return 0;

  let size = 0;
  const stack: string[] = [dirPath];

  while (stack.length > 0) {
    const currentDir = stack.pop()!;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        try {
          size += fs.statSync(fullPath).size;
        } catch {
          // 跳过无法读取的文件
        }
      }
    }
  }

  return size;
}

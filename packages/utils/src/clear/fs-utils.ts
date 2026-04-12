/**
 * @mp-svg-icons/utils— 目录与文件清理工具
 */

import fs from 'fs';
import path from 'path';

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

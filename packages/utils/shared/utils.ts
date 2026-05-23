/**
 * 共享工具函数
 */

import fs from 'fs';
import path from 'path';
import { SCAN_EXTENSIONS, SKIP_DIR_NAMES } from './constants';

/** 格式化字节数为可读字符串 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

/** 转义正则特殊字符 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 解析并校验目录路径
 * @param dir 目录路径（相对或绝对）
 * @param label 目录用途描述（用于错误信息）
 */
export function resolveDir(dir: string, label: string): string {
  const resolved = path.resolve(process.cwd(), dir);
  if (!fs.existsSync(resolved)) {
    throw new Error(`指定的${label}不存在: ${resolved}`);
  }
  return resolved;
}

/**
 * 解析并校验 --pkg-dir 指定的包路径
 * @param pkgDir 包目录路径
 * @param label 目录用途描述，默认为 '包目录'
 */
export function resolvePkgDir(pkgDir: string, label = '包目录'): string {
  return resolveDir(pkgDir, label);
}

/** 检查给定路径是否被排除集合中的某个路径包含 */
export function isExcluded(targetPath: string, excludeDirs: Set<string>): boolean {
  if (excludeDirs.has(targetPath)) return true;
  for (const excludeDir of excludeDirs) {
    const rel = path.relative(excludeDir, targetPath);
    if (!rel.startsWith('..') && !path.isAbsolute(rel)) return true;
  }
  return false;
}

/**
 * 递归遍历目录，收集需要扫描的文件
 * @param dir 要扫描的目录（绝对路径）
 * @param excludeDirs 需要排除的目录绝对路径集合
 */
export function walkDir(dir: string, excludeDirs: Set<string>): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;

  const visited = new Set<string>();
  const stack: string[] = [dir];

  while (stack.length) {
    const currentDir = stack.pop()!;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (entry.name.startsWith('.') || SKIP_DIR_NAMES.has(entry.name)) continue;

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (!isExcluded(fullPath, excludeDirs)) stack.push(fullPath);
      } else if (entry.isSymbolicLink()) {
        // 符号链接需要额外的 realpath 去重和 stat 判断
        try {
          const realPath = fs.realpathSync(fullPath);
          if (visited.has(realPath)) continue;
          visited.add(realPath);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            if (!isExcluded(fullPath, excludeDirs)) stack.push(fullPath);
          } else if (stat.isFile() && SCAN_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
            files.push(fullPath);
          }
        } catch {
          continue;
        }
      } else if (entry.isFile() && SCAN_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

import fs from 'fs';
import path from 'path';
import { SCAN_EXTENSIONS, SKIP_DIR_NAMES } from './constants';

/**
 * 格式化字节数为可读的字符串
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 转义正则特殊字符
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 解析并校验指定的目录路径
 *
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
 * 判断 childPath 是否是 parentPath 的子路径（或相同路径）
 */
function isSubPathOf(childPath: string, parentPath: string): boolean {
  const relative = path.relative(parentPath, childPath);
  return !relative.startsWith('..') && !path.isAbsolute(relative);
}

/**
 * 检查给定路径是否被排除集合中的某个路径包含
 *
 * 内部先通过 Set.has 做精确匹配快速判断，再遍历做子路径判断
 */
export function isExcluded(targetPath: string, excludeDirs: Set<string>): boolean {
  if (excludeDirs.has(targetPath)) return true;
  for (const excludeDir of excludeDirs) {
    if (isSubPathOf(targetPath, excludeDir)) return true;
  }
  return false;
}

/**
 * 递归遍历目录，收集需要扫描的文件
 *
 * @param dir 要扫描的目录（绝对路径）
 * @param excludeDirs 需要排除的目录绝对路径集合
 */
export function walkDir(dir: string, excludeDirs: Set<string>): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;

  const visited = new Set<string>();
  const stack: string[] = [dir];

  while (stack.length > 0) {
    const currentDir = stack.pop()!;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      // 跳过隐藏目录/文件和 node_modules 等
      if (entry.name.startsWith('.') || SKIP_DIR_NAMES.has(entry.name)) continue;

      const fullPath = path.join(currentDir, entry.name);
      const ext = path.extname(entry.name).toLowerCase();

      if (entry.isDirectory()) {
        if (!isExcluded(path.resolve(fullPath), excludeDirs)) {
          stack.push(fullPath);
        }
      } else if (entry.isSymbolicLink()) {
        // 仅符号链接需要额外的 stat 和 realpath
        try {
          const realPath = fs.realpathSync(fullPath);
          if (visited.has(realPath)) continue;
          visited.add(realPath);

          const stat = fs.statSync(fullPath);
          if (stat.isDirectory() && !isExcluded(path.resolve(fullPath), excludeDirs)) {
            stack.push(fullPath);
          } else if (stat.isFile() && SCAN_EXTENSIONS.has(ext)) {
            files.push(fullPath);
          }
        } catch {
          continue;
        }
      } else if (entry.isFile() && SCAN_EXTENSIONS.has(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

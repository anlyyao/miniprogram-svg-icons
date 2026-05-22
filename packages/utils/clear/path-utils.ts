/**
 * @mp-svg-icons/utils — 路径工具函数
 */

export { isExcluded, walkDir } from '../shared/utils';
import { resolveDir } from '../shared/utils';

/**
 * 解析并校验 --pkg-dir 指定的图标包路径
 */
export function resolvePkgDir(pkgDir: string): string {
  return resolveDir(pkgDir, '图标包目录');
}

/**
 * @mp-svg-icons/utils— icons.js 读写与裁剪
 */

import fs from 'fs';
import type { IconData, BrandInfo } from './types';

/**
 * 从 icons.js 文件内容中解析图标映射表
 *
 * 匹配格式：
 *   "icon-name":`<svg ...>`  — 反引号包裹（构建产物统一格式）
 *
 * key 可带引号（"name" / 'name'）也可不带（terser 对合法标识符会省略引号）
 *
 * 使用纯文本解析，避免 require() 的模块缓存问题
 *
 * 注意：构建产物中 SVG 值始终使用反引号包裹，因此 `[^`]*` 可安全匹配
 * （SVG 内容不会包含反引号字符）
 */
function parseIconsJs(content: string): Record<string, string> {
  const icons: Record<string, string> = {};
  // 匹配反引号 `svg` 包裹的格式，key 引号可选
  // 图标名严格为小写字母开头（[a-z][a-z0-9-]*），不使用 i 标志避免误匹配非图标键值对
  const regex = /(?:["']([a-z][a-z0-9-]*)["']|([a-z][a-z0-9-]*))\s*:\s*`([^`]*)`/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    icons[match[1] || match[2]] = match[3];
  }
  return icons;
}

/**
 * 读取并解析品牌的 icons 文件
 *
 * @param brand 品牌信息
 * @returns 解析结果，不存在或解析为空时返回 null
 */
export function loadIconsDataForBrand(brand: BrandInfo): IconData | null {
  const { iconsFilePath } = brand;
  if (!fs.existsSync(iconsFilePath)) return null;

  let content: string;
  try {
    content = fs.readFileSync(iconsFilePath, 'utf-8');
  } catch {
    console.warn(`⚠️ 无法读取图标文件: ${iconsFilePath}`);
    return null;
  }

  const data = parseIconsJs(content);
  const names = Object.keys(data);
  if (names.length === 0) {
    console.warn(`⚠️ 图标文件中未解析到图标: ${iconsFilePath}`);
    return null;
  }

  return { names, data, filePath: iconsFilePath, originalSize: Buffer.byteLength(content, 'utf-8') };
}

/**
 * 生成裁剪后的 icons.js 文件内容
 */
function generateClearedIconsJs(iconsMap: Record<string, string>): string {
  const kvPairs = Object.entries(iconsMap).map(
    // 防御性转义：SVG 内容中的反引号和 ${ 可能破坏模板字符串语法
    ([name, svg]) => `${JSON.stringify(name)}:\`${svg.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\``,
  );
  return `module.exports={${kvPairs.join(',')}};\n`;
}

/**
 * 裁剪 icons.js —— 只保留使用中的图标
 */
export function clearIconsJs(
  iconsData: Record<string, string>,
  iconsJsPath: string,
  usedIcons: Set<string>,
  originalSize: number,
  dryRun: boolean,
): number {
  const kept: Record<string, string> = {};
  for (const name of usedIcons) {
    if (iconsData[name] !== undefined) {
      kept[name] = iconsData[name];
    }
  }

  const newContent = generateClearedIconsJs(kept);
  if (!dryRun) {
    fs.writeFileSync(iconsJsPath, newContent);
  }

  return Math.max(0, originalSize - Buffer.byteLength(newContent, 'utf-8'));
}

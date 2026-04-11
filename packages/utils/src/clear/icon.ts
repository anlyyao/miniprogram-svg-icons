/**
 * @mp-svg-icons/utils— icons.js 读写与裁剪
 */

import fs from 'fs';
import type { MergedIconsData } from './types';

/**
 * 从 icons.js 文件内容中解析合并后的图标映射表
 *
 * 新格式：{ "brand1": { "icon1": `svg1`, ... }, "brand2": { ... } }
 *
 * 使用纯文本解析，支持嵌套结构
 */
function parseMergedIconsJs(content: string): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};

  // 匹配品牌块：{ "brand": { ... } }
  // 品牌名匹配：引号包裹或不带引号
  const brandBlockRegex = /(?:["']([a-z][a-z0-9-]*)["']|([a-z][a-z0-9-]*))\s*:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g;

  let brandMatch: RegExpExecArray | null;
  while ((brandMatch = brandBlockRegex.exec(content)) !== null) {
    const brandName = brandMatch[1] || brandMatch[2];
    const brandContent = brandMatch[3];

    // 在品牌内容中匹配图标：{ "icon": `svg` }
    const icons: Record<string, string> = {};
    const iconRegex = /(?:["']([a-z][a-z0-9-]*)["']|([a-z][a-z0-9-]*))\s*:\s*`([^`]*)`/g;

    let iconMatch: RegExpExecArray | null;
    while ((iconMatch = iconRegex.exec(brandContent)) !== null) {
      icons[iconMatch[1] || iconMatch[2]] = iconMatch[3];
    }

    if (Object.keys(icons).length > 0) {
      result[brandName] = icons;
    }
  }

  return result;
}

/**
 * 读取并解析合并后的 icons.js 文件
 *
 * @param iconsFilePath icons.js 文件路径
 * @returns 解析结果，不存在或解析为空时返回 null
 */
export function loadMergedIconsData(iconsFilePath: string): MergedIconsData | null {
  if (!fs.existsSync(iconsFilePath)) return null;

  let content: string;
  try {
    content = fs.readFileSync(iconsFilePath, 'utf-8');
  } catch {
    console.warn(`⚠️ 无法读取图标文件: ${iconsFilePath}`);
    return null;
  }

  const data = parseMergedIconsJs(content);
  const brandCount = Object.keys(data).length;
  if (brandCount === 0) {
    console.warn(`⚠️ 图标文件中未解析到图标: ${iconsFilePath}`);
    return null;
  }

  return { data, filePath: iconsFilePath, originalSize: Buffer.byteLength(content, 'utf-8') };
}

/**
 * 生成裁剪后的 icons.js 文件内容
 */
function generateClearedMergedIconsJs(brandsData: Record<string, Record<string, string>>): string {
  const brandEntries: string[] = [];

  for (const [brandName, icons] of Object.entries(brandsData)) {
    const iconEntries = Object.entries(icons).map(
      // 直接输出原始内容，不做任何转义，保持 SVG 内容完整
      ([name, svg]) => `${JSON.stringify(name)}:\`${svg}\``,
    );
    if (iconEntries.length > 0) {
      brandEntries.push(`${JSON.stringify(brandName)}:{${iconEntries.join(',')}}`);
    }
  }

  return `module.exports={${brandEntries.join(',')}};\n`;
}

/**
 * 裁剪 icons.js —— 只保留使用中的图标（按品牌）
 *
 * @param mergedData 合并后的图标数据
 * @param usedIconsByBrand 按品牌分组的使用中图标集合
 * @param dryRun 是否为预览模式
 * @returns 节省的字节数
 */
export function clearMergedIconsJs(
  mergedData: MergedIconsData,
  usedIconsByBrand: Map<string, Set<string>>,
  dryRun: boolean,
): number {
  const kept: Record<string, Record<string, string>> = {};

  for (const [brandName, icons] of Object.entries(mergedData.data)) {
    const usedIcons = usedIconsByBrand.get(brandName);
    if (!usedIcons || usedIcons.size === 0) {
      // 该品牌没有使用任何图标，跳过
      continue;
    }

    const keptIcons: Record<string, string> = {};
    for (const name of usedIcons) {
      if (icons[name] !== undefined) {
        keptIcons[name] = icons[name];
      }
    }

    if (Object.keys(keptIcons).length > 0) {
      kept[brandName] = keptIcons;
    }
  }

  const newContent = generateClearedMergedIconsJs(kept);
  if (!dryRun) {
    fs.writeFileSync(mergedData.filePath, newContent);
  }

  return Math.max(0, mergedData.originalSize - Buffer.byteLength(newContent, 'utf-8'));
}

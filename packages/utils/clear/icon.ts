/**
 * @mp-svg-icons/utils— icons.js 读写与裁剪
 */

import fs from 'fs';
import type { IconsData } from './types';

/**
 * 从 icons.js 文件内容中解析图标映射表
 *
 * 格式：module.exports = { "brand": { "icon": `<svg>...</svg>`, ... }, ... }
 *
 * 利用反引号 (`) 作为锚点分割——反引号在 SVG 内容中不会出现，
 * 而花括号 {} 会出现（如 {{fillColor1 || 'transparent'}}），不能用于边界匹配。
 */
function parseIconsJs(content: string): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};

  // 按反引号分割：奇数索引为模板字符串内容（SVG），偶数索引为结构代码
  const parts = content.split('`');
  if (parts.length < 3) return result;

  // 匹配属性名（支持 "name"、'name'、name）
  const keyRegex = /(?:["']([a-z][a-z0-9-]*)["']|([a-z][a-z0-9-]*))\s*:\s*$/;
  // 匹配品牌名 + 开头花括号（属性名后跟 { 开始一个新对象）
  const brandRegex = /(?:["']([a-z][a-z0-9-]*)["']|([a-z][a-z0-9-]*))\s*:\s*\{[^`]*$/;

  let currentBrand: string | null = null;
  let icons: Record<string, string> = {};

  for (let i = 0; i < parts.length - 1; i += 2) {
    const code = parts[i];
    const svg = parts[i + 1];

    // 尝试从结构代码中提取图标名（紧挨反引号前的 key:）
    const iconMatch = keyRegex.exec(code);
    if (iconMatch) {
      const iconName = iconMatch[1] || iconMatch[2];

      // 检查是否切换了品牌（结构代码中包含 brandName: { ）
      const brandMatch = brandRegex.exec(code);
      if (brandMatch) {
        // 保存上一个品牌的数据
        if (currentBrand && Object.keys(icons).length > 0) {
          result[currentBrand] = icons;
        }
        currentBrand = brandMatch[1] || brandMatch[2];
        icons = {};
      }

      if (currentBrand) {
        icons[iconName] = svg;
      }
    }
  }

  // 保存最后一个品牌
  if (currentBrand && Object.keys(icons).length > 0) {
    result[currentBrand] = icons;
  }

  return result;
}

/**
 * 读取并解析 icons.js 文件
 *
 * @param iconsFilePath icons.js 文件路径
 * @returns 解析结果，不存在或解析为空时返回 null
 */
export function loadIconsData(iconsFilePath: string): IconsData | null {
  if (!fs.existsSync(iconsFilePath)) return null;

  let content: string;
  try {
    content = fs.readFileSync(iconsFilePath, 'utf-8');
  } catch {
    console.warn(`⚠️ 无法读取图标文件: ${iconsFilePath}`);
    return null;
  }

  const data = parseIconsJs(content);
  const brandCount = Object.keys(data).length;
  if (brandCount === 0) {
    console.warn(`⚠️ 图标文件中未解析到图标: ${iconsFilePath}`);
    return null;
  }

  return {
    data,
    filePath: iconsFilePath,
    originalSize: Buffer.byteLength(content, 'utf-8'),
  };
}

/**
 * 生成裁剪后的 icons.js 文件内容
 */
function generateClearedIconsJs(brandsData: Record<string, Record<string, string>>): string {
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
 * @param iconsData icons.js 图标数据
 * @param usedIconsByBrand 按品牌分组的使用中图标集合
 * @param dryRun 是否为预览模式
 * @returns 节省的字节数
 */
export function clearIconsJs(
  iconsData: IconsData,
  usedIconsByBrand: Map<string, Set<string>>,
  dryRun: boolean,
): number {
  const kept: Record<string, Record<string, string>> = {};

  for (const [brandName, icons] of Object.entries(iconsData.data)) {
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

  const newContent = generateClearedIconsJs(kept);
  if (!dryRun) {
    fs.writeFileSync(iconsData.filePath, newContent);
  }

  return Math.max(0, iconsData.originalSize - Buffer.byteLength(newContent, 'utf-8'));
}

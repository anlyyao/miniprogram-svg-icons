import fs from 'fs-extra';
import path from 'path';
import {
  PACKAGES_DIR,
  PlatformConfig,
  BrandInfo,
  SvgEntry,
  PlatformTemplates,
  BrandIconsMap,
  scanBrands,
  parseArgs,
  getPlatformConfig,
  loadAllSvgs,
  generatePlatformTemplates,
  generateIconsJS,
  cleanOutputDir,
} from './shared';

// ======================== 生成函数 ========================

export interface GenerateResult {
  iconCount: number;
  duration: number;
  platform: string;
  outputDir: string;
  brands: string[];
}

/** 生成图标组件（Icon）（在平台根目录，所有品牌共用） */
async function generateIconComponent(
  platformOutputDir: string,
  platform: PlatformConfig,
  brandsIcons: BrandIconsMap,
  templates: PlatformTemplates,
): Promise<void> {
  const tplFileName = `index${platform.templateExt}`;
  const iconComponentDir = path.join(platformOutputDir, 'icon');
  fs.ensureDirSync(iconComponentDir);

  // 生成 icons.js
  const iconsDataSource = generateIconsJS(brandsIcons);

  // index.json
  const iconJsonParsed = JSON.parse(templates.iconJsonTemplate);
  const finalIconJson = JSON.stringify(iconJsonParsed, null, 2) + '\n';

  await Promise.all([
    fs.writeFile(path.join(iconComponentDir, 'icons.js'), iconsDataSource),
    fs.writeFile(path.join(iconComponentDir, 'index.js'), templates.iconJSSource),
    fs.writeFile(path.join(iconComponentDir, 'index.json'), finalIconJson),
    fs.writeFile(path.join(iconComponentDir, tplFileName), templates.iconTemplateContent),
  ]);

  console.log(`  📦 图标组件（Icon）已生成（包含 icons.js）`);
}

// ======================== 单品牌生成 ========================

interface BrandGenerateResult {
  brand: string;
  icons: SvgEntry[];
  outputDir: string;
}

/**
 * 加载单个品牌的图标数据
 */
async function loadBrandIcons(brand: BrandInfo, platformOutputDir: string): Promise<BrandGenerateResult> {
  console.log(`\n  🎨 品牌: ${brand.name}`);

  const icons = loadAllSvgs(brand);

  console.log(`  ✅ [${brand.name}] 共加载 ${icons.length} 个图标`);

  return { brand: brand.name, icons, outputDir: platformOutputDir };
}

// ======================== 主生成入口 ========================

/**
 * 生成小程序图标组件库
 * 输出完整的组件库到 packages/{platform}/，包含：
 * - icon/ 图标组件（Icon）（包含 icons.js）
 *
 * @param platformId - 平台标识（wechat / alipay / kuaishou）
 */
export async function generate(platformId: string = 'wechat'): Promise<GenerateResult> {
  const platform = getPlatformConfig(platformId);

  const start = Date.now();
  const platformOutputDir = path.resolve(PACKAGES_DIR, platformId);

  console.log(`\n🏗️  生成平台: ${platform.label} (${platformId})`);
  console.log(`📁 平台输出目录: ${platformOutputDir}`);

  // -------- 清理平台目录（保留 package.json）--------
  await cleanOutputDir(platformOutputDir);

  // -------- 扫描所有品牌 --------
  const brands = scanBrands();
  console.log(`🔍 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // -------- 为每个品牌加载图标数据 --------
  let totalIconCount = 0;
  const brandNames: string[] = [];
  const brandsIcons: BrandIconsMap = {};

  for (const brand of brands) {
    const result = await loadBrandIcons(brand, platformOutputDir);
    totalIconCount += result.icons.length;
    brandNames.push(result.brand);
    brandsIcons[result.brand] = result.icons;
  }

  // -------- 动态生成模板并输出图标组件（Icon）（包含 icons.js） --------
  const templates = generatePlatformTemplates(platform);
  await generateIconComponent(platformOutputDir, platform, brandsIcons, templates);

  const duration = (Date.now() - start) / 1000;
  console.log(`\n✅ [${platform.label}] 全部品牌生成完成，共 ${totalIconCount} 个图标`);
  console.log(`⏱️  耗时: ${duration.toFixed(1)}s\n`);

  return {
    iconCount: totalIconCount,
    duration,
    platform: platformId,
    outputDir: platformOutputDir,
    brands: brandNames,
  };
}

// ======================== 入口 ========================

if (require.main === module) {
  const { platform } = parseArgs();
  generate(platform).catch((err) => {
    console.error('❌ 生成失败:', err);
    process.exit(1);
  });
}

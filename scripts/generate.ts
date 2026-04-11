import fs from 'fs-extra';
import path from 'path';
import {
  PACKAGES_DIR,
  TEMPLATE_DIR,
  PlatformConfig,
  BrandInfo,
  IconEntry,
  PlatformTemplates,
  scanBrands,
  parseArgs,
  getPlatformConfig,
  loadAndFilterIcons,
  loadPlatformTemplates,
  generateIconJS,
  generateIconsDataJS,
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

interface GenerateContext {
  platform: PlatformConfig;
  brand: BrandInfo;
  outputDir: string;
  platformTemplateDir: string;
  tplFileName: string;
}

/** 生成单图标组件 */
async function generateSingleIcons(
  ctx: GenerateContext,
  icons: IconEntry[],
  singleIconJsonTemplate: string,
  singleIconTemplateContent: string,
): Promise<void> {

  for (const icon of icons) {
    const iconDir = path.join(ctx.outputDir, `${icon.name}-icon`);
    fs.ensureDirSync(iconDir);
  }

  const jsonBuf = Buffer.from(singleIconJsonTemplate, 'utf-8');
  const tplBuf = Buffer.from(singleIconTemplateContent, 'utf-8');

  const writePromises: Promise<void>[] = [];

  for (const icon of icons) {
    const iconDir = path.join(ctx.outputDir, `${icon.name}-icon`);
    const jsSource = generateIconJS(icon.svg, ctx.platform);

    writePromises.push(
      fs.writeFile(path.join(iconDir, 'index.js'), jsSource),
      fs.writeFile(path.join(iconDir, 'index.json'), jsonBuf),
      fs.writeFile(path.join(iconDir, ctx.tplFileName), tplBuf),
    );
  }

  await Promise.all(writePromises);
  console.log(`  📦 ${icons.length}/${icons.length} 图标已完成\n`);
}

/** 生成通用 icon 组件（在平台根目录，所有品牌共用） */
async function generateIconComponent(
  platformOutputDir: string,
  platform: PlatformConfig,
  brands: BrandInfo[],
  templates: PlatformTemplates,
): Promise<void> {
  const tplFileName = `index${platform.templateExt}`;
  const iconComponentDir = path.join(platformOutputDir, 'icon');
  fs.ensureDirSync(iconComponentDir);

  // 生成品牌映射的 require 语句
  const iconsMapEntries = brands
    .map((brand) => `  ${JSON.stringify(brand.name)}: require('./${brand.name}-icons')`)
    .join(',\n');

  // 替换模板中的占位符
  const iconJSSource = templates.iconJSSource
    .replace('/* __ICONS_MAP_PLACEHOLDER__ */', iconsMapEntries);

  // index.json
  const iconJsonParsed = JSON.parse(templates.iconJsonTemplate);
  const finalIconJson = JSON.stringify(iconJsonParsed, null, 2) + '\n';

  await Promise.all([
    fs.writeFile(path.join(iconComponentDir, 'index.js'), iconJSSource),
    fs.writeFile(path.join(iconComponentDir, 'index.json'), finalIconJson),
    fs.writeFile(path.join(iconComponentDir, tplFileName), templates.iconTemplateContent),
  ]);

  console.log(`  📦 通用 icon 组件已生成`);
}


// ======================== 单品牌生成 ========================

interface BrandGenerateResult {
  brand: string;
  iconCount: number;
  outputDir: string;
}

/**
 * 生成单个品牌的图标组件
 */
async function generateBrand(
  platform: PlatformConfig,
  brand: BrandInfo,
  platformOutputDir: string,
  platformTemplateDir: string,
): Promise<BrandGenerateResult> {
  const tplFileName = `index${platform.templateExt}`;
  const outputDir = path.join(platformOutputDir, brand.name);

  const ctx: GenerateContext = { platform, brand, outputDir, platformTemplateDir, tplFileName };

  console.log(`\n  🎨 品牌: ${brand.name}`);
  console.log(`  📁 输出目录: ${outputDir}\n`);

  // -------- 0. 创建品牌目录 --------
  fs.ensureDirSync(outputDir);

  // -------- 1. 加载图标 & 读取模板 --------
  const icons = loadAndFilterIcons(brand);
  const templates = loadPlatformTemplates(platformTemplateDir, platform);

  // -------- 2. 生成 common/use-icon.js（在平台根目录） --------
  const commonDir = path.join(platformOutputDir, 'common');
  fs.ensureDirSync(commonDir);
  fs.writeFileSync(path.join(commonDir, 'use-icon.js'), templates.useIconSource);

  // -------- 3. 生成品牌图标数据到 icon/{brand}-icons.js --------
  const iconComponentDir = path.join(platformOutputDir, 'icon');
  fs.ensureDirSync(iconComponentDir);
  const iconsDataSource = generateIconsDataJS(icons);
  await fs.writeFile(path.join(iconComponentDir, `${brand.name}-icons.js`), iconsDataSource);

  // -------- 4. 生成单图标组件 --------
  await generateSingleIcons(ctx, icons, templates.singleIconJsonTemplate, templates.singleIconTemplateContent);

  console.log(`  ✅ [${brand.name}] 共生成 ${icons.length} 个图标组件`);

  return { brand: brand.name, iconCount: icons.length, outputDir };
}

// ======================== 主生成入口 ========================

/**
 * 生成小程序图标组件库
 * 输出完整的组件库到 packages/{platform}/，包含：
 * - {brand}/ 各品牌的单图标组件
 * - icon/ 通用 icon 组件（包含所有品牌的图标数据）
 * - common/use-icon.js
 *
 * @param platformId - 平台标识（wechat / alipay / kuaishou）
 */
export async function generate(platformId: string = 'wechat'): Promise<GenerateResult> {
  const platform = getPlatformConfig(platformId);

  const start = Date.now();
  const platformOutputDir = path.resolve(PACKAGES_DIR, platformId);
  const platformTemplateDir = path.join(TEMPLATE_DIR, platform.templateDir);

  console.log(`\n🏗️  生成平台: ${platform.label} (${platformId})`);
  console.log(`📁 平台输出目录: ${platformOutputDir}`);

  // -------- 清理平台目录（保留 package.json）--------
  await cleanOutputDir(platformOutputDir);

  // -------- 扫描所有品牌 --------
  const brands = scanBrands();
  console.log(`🔍 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // -------- 为每个品牌生成组件 --------
  let totalIconCount = 0;
  const brandNames: string[] = [];

  for (const brand of brands) {
    const result = await generateBrand(platform, brand, platformOutputDir, platformTemplateDir);
    totalIconCount += result.iconCount;
    brandNames.push(result.brand);
  }

  // -------- 生成通用 icon 组件（所有品牌共用） --------
  const templates = loadPlatformTemplates(platformTemplateDir, platform);
  await generateIconComponent(platformOutputDir, platform, brands, templates);

  const duration = (Date.now() - start) / 1000;
  console.log(`\n✅ [${platform.label}] 全部品牌生成完成，共 ${totalIconCount} 个图标组件`);
  console.log(`⏱️  耗时: ${duration.toFixed(1)}s\n`);

  return { iconCount: totalIconCount, duration, platform: platformId, outputDir: platformOutputDir, brands: brandNames };
}

// ======================== 入口 ========================

if (require.main === module) {
  const { platform } = parseArgs();
  generate(platform).catch((err) => {
    console.error('❌ 生成失败:', err);
    process.exit(1);
  });
}

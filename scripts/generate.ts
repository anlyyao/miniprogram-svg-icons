import fs from 'fs-extra';
import path from 'path';
import { parseSvg, generateSvg } from './utils/svgTotemplate';
import {
  PACKAGES_DIR,
  TEMPLATE_DIR,
  PlatformConfig,
  BrandInfo,
  scanBrands,
  parseArgs,
  getPlatformConfig,
} from './shared';

// ======================== SVG 解析 ========================

interface IconEntry {
  name: string;
  svg: string;
}

function loadIcons(svgDir: string): IconEntry[] {
  if (!fs.existsSync(svgDir)) {
    throw new Error(`SVG directory not found: ${svgDir}`);
  }

  const svgFiles = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'));

  const rawEntries: { name: string; content: string; file: string }[] = [];
  for (const file of svgFiles) {
    try {
      const filePath = path.join(svgDir, file);
      rawEntries.push({
        name: path.basename(file, '.svg'),
        content: fs.readFileSync(filePath, 'utf-8'),
        file,
      });
    } catch (err) {
      console.error(`  ⚠️  读取失败: ${file}`, err instanceof Error ? err.message : String(err));
    }
  }

  const icons: IconEntry[] = [];
  for (const entry of rawEntries) {
    try {
      icons.push({ name: entry.name, svg: generateSvg(parseSvg(entry.content), entry.name) });
    } catch (err) {
      console.error(`  ⚠️  解析失败: ${entry.file}`, err instanceof Error ? err.message : String(err));
    }
  }

  return icons;
}

function loadAndFilterIcons(brand: BrandInfo): IconEntry[] {
  console.log(`📂 读取 SVG 图标: ${brand.svgDir}`);

  const svgFiles = fs.readdirSync(brand.svgDir).filter((f) => f.endsWith('.svg'));
  console.log(`📄 发现 ${svgFiles.length} 个 SVG 文件`);

  const icons = loadIcons(brand.svgDir);

  if (icons.length < svgFiles.length) {
    const missing = svgFiles.length - icons.length;
    console.warn(`⚠️  有 ${missing} 个 SVG 文件解析失败，请检查上方日志`);
  }

  console.log(`✅ 成功解析 ${icons.length} 个图标\n`);
  return icons;
}

// ======================== 生成单图标 JS 源码 ========================

function generateIconJS(svgContent: string, platform: PlatformConfig): string {
  const reuseKey = platform.reuseKey;
  return `var useIcon = require("../../common/use-icon");

Component({
  ${reuseKey}: [useIcon],
  data: {
    svgContent: \`${svgContent}\`,
  },
});
`;
}

// ======================== 生成 SVG 映射表 JS 源码 ========================

function generateIconsDataJS(icons: IconEntry[]): string {
  const entries = icons.map((icon) => `  ${JSON.stringify(icon.name)}: \`${icon.svg}\``);
  return `module.exports = {\n${entries.join(',\n')}\n};\n`;
}

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

interface PlatformTemplates {
  singleIconJsonTemplate: string;
  singleIconTemplateContent: string;
  iconJsonTemplate: string;
  iconTemplateContent: string;
  useIconSource: string;
  iconJSSource: string;
}

/** 清理旧产物（保留 package.json 和 README.md） */
async function cleanOutputDir(outputDir: string): Promise<void> {
  if (!fs.existsSync(outputDir)) {
    fs.ensureDirSync(outputDir);
    return;
  }

  const items = fs.readdirSync(outputDir);
  const removePromises: Promise<void>[] = [];

  for (const item of items) {
    if (item === 'package.json' || item === 'README.md') continue;
    removePromises.push(
      fs.remove(path.join(outputDir, item)).catch((err) => {
        console.warn(`  ⚠️  清理失败: ${item}: ${err instanceof Error ? err.message : String(err)}`);
      }),
    );
  }

  await Promise.all(removePromises);
}

/** 安全读取模板文件 */
function readTemplateFile(dir: string, filename: string): string {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`模板文件不存在: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

/** 查找并读取模板文件（支持动态扩展名） */
function findAndReadTemplate(dir: string, ext: string): string {
  const files = fs.readdirSync(dir);
  const templateFile = files.find((f) => f.startsWith('index') && f.endsWith(ext));

  if (!templateFile) {
    throw new Error(`未找到模板文件: ${dir}/index${ext}`);
  }

  return fs.readFileSync(path.join(dir, templateFile), 'utf-8');
}

/** 读取平台模板文件 */
function loadPlatformTemplates(platformTemplateDir: string, platform: PlatformConfig): PlatformTemplates {
  try {
    // 单图标模板
    const singleIconTemplateContent = findAndReadTemplate(
      path.join(platformTemplateDir, 'single-icon'),
      platform.templateExt
    );
    const singleIconJsonTemplate = readTemplateFile(platformTemplateDir, 'single-icon/index.json');

    // 通用 icon 组件模板
    const iconTemplateContent = findAndReadTemplate(
      path.join(platformTemplateDir, 'icon'),
      platform.templateExt
    );
    const iconJsonTemplate = readTemplateFile(platformTemplateDir, 'icon/index.json');
    const iconJSSource = readTemplateFile(platformTemplateDir, 'icon/index.js');

    // 公共模块
    const useIconSource = readTemplateFile(platformTemplateDir, 'common/use-icon.js');

    return {
      singleIconJsonTemplate,
      singleIconTemplateContent,
      iconJsonTemplate,
      iconTemplateContent,
      useIconSource,
      iconJSSource,
    };
  } catch (err) {
    throw new Error(
      `加载平台模板失败 [${platform.label}]: ${err instanceof Error ? err.message : String(err)}`
    );
  }
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

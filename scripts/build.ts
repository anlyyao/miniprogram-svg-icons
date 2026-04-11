import { minify as terserMinify } from 'terser';
import fs from 'fs-extra';
import path from 'path';
import {
  ROOT_DIR,
  DIST_DIR,
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
  cleanDistDir,
} from './shared';

// ======================== 配置常量 ========================

const CONCURRENCY_LIMIT = 200; // 并发处理 JS 文件数量限制

// ======================== 压缩工具 ========================

/** 压缩 JSON：去空白 */
function minifyJSON(content: string): string {
  try {
    return JSON.stringify(JSON.parse(content));
  } catch {
    return content;
  }
}

/** 压缩模板（WXML/AXML/KSML）：去 HTML 注释、折叠空白 */
function minifyTemplate(content: string): string {
  return content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** terser 压缩选项 */
const TERSER_OPTIONS = {
  ecma: 5 as const,
  compress: { dead_code: true, drop_console: false, passes: 1 },
  mangle: { toplevel: false },
  format: { comments: false },
};

/** terser 压缩选项（icons.js：保留模板字符串反引号，保留 key 引号） */
const TERSER_OPTIONS_TEMPLATE_LITERAL = {
  ecma: 2015 as const,
  compress: { defaults: false },
  mangle: false,
  format: { comments: false, quote_keys: true },
};

// ======================== 压缩函数 ========================

/** 压缩 JS 代码 */
async function minifyJS(source: string, isIconsJs: boolean = false): Promise<string> {
  const options = isIconsJs ? TERSER_OPTIONS_TEMPLATE_LITERAL : TERSER_OPTIONS;
  const minified = await terserMinify(source, options);
  return minified.code || source;
}

// ======================== 并发控制 ========================

/** 并发控制：限制同时执行的 Promise 数量 */
async function pLimit<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let currentIndex = 0;

  async function runNext(): Promise<void> {
    const index = currentIndex++;
    if (index >= tasks.length) return;

    results[index] = await tasks[index]();
    await runNext();
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, () => runNext())
  );

  return results;
}

// ======================== 构建函数 ========================

export interface BuildResult {
  duration: number;
  platform: string;
  distDir: string;
  brands: string[];
  iconCount: number;
}

interface BuildContext {
  platform: PlatformConfig;
  brand: BrandInfo;
  outputDir: string;
  tplFileName: string;
}

/** 生成并压缩单图标组件 */
async function buildSingleIcons(
  ctx: BuildContext,
  icons: IconEntry[],
  singleIconJsonTemplate: string,
  singleIconTemplateContent: string,
): Promise<void> {

  // 创建所有图标目录
  for (const icon of icons) {
    const iconDir = path.join(ctx.outputDir, `${icon.name}-icon`);
    fs.ensureDirSync(iconDir);
  }

  // 压缩模板和 JSON
  const minifiedJson = minifyJSON(singleIconJsonTemplate);
  const minifiedTemplate = minifyTemplate(singleIconTemplateContent);

  // 并发压缩和写入 JS 文件
  const jsTasks = icons.map((icon) => async () => {
    const iconDir = path.join(ctx.outputDir, `${icon.name}-icon`);
    const jsSource = generateIconJS(icon.svg, ctx.platform);
    const minifiedJs = await minifyJS(jsSource);

    await Promise.all([
      fs.writeFile(path.join(iconDir, 'index.js'), minifiedJs),
      fs.writeFile(path.join(iconDir, 'index.json'), minifiedJson),
      fs.writeFile(path.join(iconDir, ctx.tplFileName), minifiedTemplate),
    ]);
  });

  await pLimit(jsTasks, CONCURRENCY_LIMIT);
  console.log(`  📦 ${icons.length}/${icons.length} 图标已完成\n`);
}

/** 生成并压缩通用 icon 组件 */
async function buildIconComponent(
  platformDistDir: string,
  platform: PlatformConfig,
  brands: BrandInfo[],
  templates: PlatformTemplates,
): Promise<void> {
  const tplFileName = `index${platform.templateExt}`;
  const iconComponentDir = path.join(platformDistDir, 'icon');
  fs.ensureDirSync(iconComponentDir);

  // 生成品牌映射的 require 语句
  const iconsMapEntries = brands
    .map((brand) => `  ${JSON.stringify(brand.name)}: require('./${brand.name}-icons')`)
    .join(',\n');

  // 替换模板中的占位符
  const iconJSSource = templates.iconJSSource
    .replace('/* __ICONS_MAP_PLACEHOLDER__ */', iconsMapEntries);

  // 压缩各文件
  const [minifiedIconJS, minifiedIconJson, minifiedIconTemplate] = await Promise.all([
    minifyJS(iconJSSource),
    Promise.resolve(minifyJSON(templates.iconJsonTemplate)),
    Promise.resolve(minifyTemplate(templates.iconTemplateContent)),
  ]);

  await Promise.all([
    fs.writeFile(path.join(iconComponentDir, 'index.js'), minifiedIconJS),
    fs.writeFile(path.join(iconComponentDir, 'index.json'), minifiedIconJson),
    fs.writeFile(path.join(iconComponentDir, tplFileName), minifiedIconTemplate),
  ]);

  console.log(`  📦 通用 icon 组件已生成`);
}

/** 生成并压缩 common/use-icon.js */
async function buildCommonModule(platformDistDir: string, templates: PlatformTemplates): Promise<void> {
  const commonDir = path.join(platformDistDir, 'common');
  fs.ensureDirSync(commonDir);

  const minifiedUseIcon = await minifyJS(templates.useIconSource);
  await fs.writeFile(path.join(commonDir, 'use-icon.js'), minifiedUseIcon);
}

// ======================== 单品牌构建 ========================

interface BrandBuildResult {
  brand: string;
  iconCount: number;
  outputDir: string;
}

/**
 * 构建单个品牌的图标组件（从 SVG 直接生成压缩产物）
 */
async function buildBrand(
  platform: PlatformConfig,
  brand: BrandInfo,
  platformDistDir: string,
  platformTemplateDir: string,
): Promise<BrandBuildResult> {
  const tplFileName = `index${platform.templateExt}`;
  const outputDir = path.join(platformDistDir, brand.name);

  const ctx: BuildContext = { platform, brand, outputDir, tplFileName };

  console.log(`\n  🎨 品牌: ${brand.name}`);
  console.log(`  📁 输出目录: ${outputDir}\n`);

  // -------- 0. 创建品牌目录 --------
  fs.ensureDirSync(outputDir);

  // -------- 1. 加载图标 & 读取模板 --------
  const icons = loadAndFilterIcons(brand);
  const templates = loadPlatformTemplates(platformTemplateDir, platform);

  // -------- 2. 生成并压缩品牌图标数据到 icon/{brand}-icons.js --------
  const iconComponentDir = path.join(platformDistDir, 'icon');
  fs.ensureDirSync(iconComponentDir);
  const iconsDataSource = generateIconsDataJS(icons);
  const minifiedIconsData = await minifyJS(iconsDataSource, true);
  await fs.writeFile(path.join(iconComponentDir, `${brand.name}-icons.js`), minifiedIconsData);

  // -------- 3. 生成并压缩单图标组件 --------
  await buildSingleIcons(ctx, icons, templates.singleIconJsonTemplate, templates.singleIconTemplateContent);

  console.log(`  ✅ [${brand.name}] 共生成 ${icons.length} 个图标组件`);

  return { brand: brand.name, iconCount: icons.length, outputDir };
}

// ======================== 主构建入口 ========================

/**
 * 编译打包小程序图标组件库
 * 直接从 SVG 资源生成并压缩输出到 dist/{platform}/
 *
 * @param platformId - 平台标识（wechat / alipay / kuaishou）
 */
export async function build(platformId: string = 'wechat'): Promise<BuildResult> {
  const platform = getPlatformConfig(platformId);

  const start = Date.now();
  const platformDistDir = path.resolve(DIST_DIR, platformId);
  const platformTemplateDir = path.join(TEMPLATE_DIR, platform.templateDir);

  console.log(`\n📦 编译打包平台: ${platform.label} (${platformId})`);
  console.log(`📁 输出目录: ${platformDistDir}`);

  // -------- 0. 清理 dist 目录 --------
  cleanDistDir(platformDistDir);

  // -------- 1. 扫描所有品牌 --------
  const brands = scanBrands();
  console.log(`🔍 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // -------- 2. 读取模板文件 --------
  const templates = loadPlatformTemplates(platformTemplateDir, platform);

  // -------- 3. 生成并压缩 common/use-icon.js --------
  await buildCommonModule(platformDistDir, templates);
  console.log(`  📦 common/use-icon.js 已生成`);

  // -------- 4. 为每个品牌构建组件 --------
  let totalIconCount = 0;
  const brandNames: string[] = [];

  for (const brand of brands) {
    const result = await buildBrand(platform, brand, platformDistDir, platformTemplateDir);
    totalIconCount += result.iconCount;
    brandNames.push(result.brand);
  }

  // -------- 5. 生成并压缩通用 icon 组件 --------
  await buildIconComponent(platformDistDir, platform, brands, templates);

  // -------- 6. 复制 README.md 到产物目录 --------
  const sourceReadmePath = path.resolve(ROOT_DIR, 'packages', platformId, 'README.md');
  const distReadmePath = path.resolve(platformDistDir, 'README.md');
  if (fs.existsSync(sourceReadmePath)) {
    fs.copyFileSync(sourceReadmePath, distReadmePath);
    console.log(`📄 已复制 README.md 到产物目录`);
  } else {
    console.log(`⚠️  未找到 ${sourceReadmePath}，跳过 README 复制`);
  }

  // -------- 7. 复制 package.json 到产物目录 --------
  const sourcePackageJsonPath = path.resolve(ROOT_DIR, 'packages', platformId, 'package.json');
  const distPackageJsonPath = path.resolve(platformDistDir, 'package.json');
  if (fs.existsSync(sourcePackageJsonPath)) {
    fs.copyFileSync(sourcePackageJsonPath, distPackageJsonPath);
    console.log(`📄 已复制 package.json 到产物目录`);
  } else {
    console.log(`⚠️  未找到 ${sourcePackageJsonPath}，跳过 package.json 复制`);
  }

  const duration = (Date.now() - start) / 1000;
  console.log(`\n✅ [${platform.label}] 全部品牌打包完成，共 ${totalIconCount} 个图标组件`);
  console.log(`⏱️  耗时: ${duration.toFixed(1)}s\n`);

  return { duration, platform: platformId, distDir: platformDistDir, brands: brandNames, iconCount: totalIconCount };
}

// ======================== CLI 入口 ========================

if (require.main === module) {
  const { platform } = parseArgs();
  build(platform).catch((err) => {
    console.error('❌ 打包失败:', err);
    process.exit(1);
  });
}

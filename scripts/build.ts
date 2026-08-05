import { minify as terserMinify } from 'terser';
import fs from 'fs-extra';
import path from 'path';
import {
  ROOT_DIR,
  DIST_DIR,
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
  cleanDistDir,
} from './shared';

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

// ======================== 构建函数 ========================

export interface BuildResult {
  duration: number;
  platform: string;
  distDir: string;
  brands: string[];
  iconCount: number;
}

/** 生成并压缩图标组件（Icon） */
async function buildIconComponent(
  platformDistDir: string,
  platform: PlatformConfig,
  brandsIcons: BrandIconsMap,
  templates: PlatformTemplates,
): Promise<void> {
  const tplFileName = `index${platform.templateExt}`;
  const iconComponentDir = path.join(platformDistDir, 'icon');
  fs.ensureDirSync(iconComponentDir);

  // 生成 icons.js
  const iconsDataSource = generateIconsJS(brandsIcons);

  // 压缩各文件
  const [minifiedIconsData, minifiedIconJS, minifiedIconJson, minifiedIconTemplate] = await Promise.all([
    minifyJS(iconsDataSource, true),
    minifyJS(templates.iconJSSource),
    Promise.resolve(minifyJSON(templates.iconJsonTemplate)),
    Promise.resolve(minifyTemplate(templates.iconTemplateContent)),
  ]);

  await Promise.all([
    fs.writeFile(path.join(iconComponentDir, 'icons.js'), minifiedIconsData),
    fs.writeFile(path.join(iconComponentDir, 'index.js'), minifiedIconJS),
    fs.writeFile(path.join(iconComponentDir, 'index.json'), minifiedIconJson),
    fs.writeFile(path.join(iconComponentDir, tplFileName), minifiedIconTemplate),
  ]);

  console.log(`  📦 图标组件（Icon）已生成（包含 icons.js）`);
}

// ======================== 单品牌构建 ========================

interface BrandBuildResult {
  brand: string;
  icons: SvgEntry[];
}

/**
 * 加载单个品牌的图标数据（从 SVG 直接加载）
 */
async function buildBrand(brand: BrandInfo): Promise<BrandBuildResult> {
  console.log(`\n  🎨 品牌: ${brand.name}`);

  const icons = loadAllSvgs(brand);

  console.log(`  ✅ [${brand.name}] 共加载 ${icons.length} 个图标`);

  return { brand: brand.name, icons };
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

  console.log(`\n📦 编译打包平台: ${platform.label} (${platformId})`);
  console.log(`📁 输出目录: ${platformDistDir}`);

  // -------- 0. 清理 dist 目录 --------
  cleanDistDir(platformDistDir);

  // -------- 1. 扫描所有品牌 --------
  const brands = scanBrands();
  console.log(`🔍 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // -------- 2. 动态生成模板 --------
  const templates = generatePlatformTemplates(platform);

  // -------- 3. 为每个品牌加载图标数据 --------
  let totalIconCount = 0;
  const brandNames: string[] = [];
  const brandsIcons: BrandIconsMap = {};

  for (const brand of brands) {
    const result = await buildBrand(brand);
    totalIconCount += result.icons.length;
    brandNames.push(result.brand);
    brandsIcons[result.brand] = result.icons;
  }

  // -------- 4. 生成并压缩图标组件（Icon）（包含 icons.js） --------
  await buildIconComponent(platformDistDir, platform, brandsIcons, templates);

  // -------- 5. 复制 package.json、README.md、CHANGELOG.md 到产物目录 --------
  const sourcePkgDir = path.resolve(ROOT_DIR, 'packages', platformId);
  const OPTIONAL_FILES = ['CHANGELOG.md'];
  for (const file of ['package.json', 'README.md', ...OPTIONAL_FILES]) {
    const src = path.resolve(sourcePkgDir, file);
    const dest = path.resolve(platformDistDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`📄 已复制 ${file} 到产物目录`);
    } else if (!OPTIONAL_FILES.includes(file)) {
      console.log(`⚠️  未找到 ${src}，跳过 ${file} 复制`);
    }
  }

  const duration = (Date.now() - start) / 1000;
  console.log(`\n✅ [${platform.label}] 全部品牌打包完成，共 ${totalIconCount} 个图标`);
  console.log(`⏱️  耗时: ${duration.toFixed(1)}s\n`);

  return {
    duration,
    platform: platformId,
    distDir: platformDistDir,
    brands: brandNames,
    iconCount: totalIconCount,
  };
}

// ======================== CLI 入口 ========================

if (require.main === module) {
  const { platform } = parseArgs();
  build(platform).catch((err) => {
    console.error('❌ 打包失败:', err);
    process.exit(1);
  });
}

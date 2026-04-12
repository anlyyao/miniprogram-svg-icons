import fs from 'fs-extra';
import path from 'path';
import { parseSvg, generateSvg } from './utils/svgTotemplate';

// ======================== 路径常量 ========================

const SCRIPTS_DIR = __dirname;
export const ROOT_DIR = path.resolve(SCRIPTS_DIR, '..');
export const PACKAGES_DIR = path.resolve(ROOT_DIR, 'packages');
export const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
export const RESOURCES_DIR = path.resolve(ROOT_DIR, 'resources');
export const TEMPLATE_DIR = path.resolve(SCRIPTS_DIR, './template');

// ======================== 平台配置 ========================

export interface PlatformConfig {
  /** 平台标识 */
  id: string;
  /** 平台显示名 */
  label: string;
  /** 模板文件后缀：模板 */
  templateExt: string;
  /** 模板文件后缀：样式 */
  styleExt: string;
  /** 模板目录名（对应 template/{platform}/） */
  templateDir: string;
}

export const PLATFORMS: Record<string, PlatformConfig> = {
  wechat: {
    id: 'wechat',
    label: '微信小程序',
    templateExt: '.wxml',
    styleExt: '.wxss',
    templateDir: 'wechat',
  },
  alipay: {
    id: 'alipay',
    label: '支付宝小程序',
    templateExt: '.axml',
    styleExt: '.acss',
    templateDir: 'alipay',
  },
  kuaishou: {
    id: 'kuaishou',
    label: '快手小程序',
    templateExt: '.ksml',
    styleExt: '.css',
    templateDir: 'kuaishou',
  },
  xiaohongshu: {
    id: 'xiaohongshu',
    label: '小红书小程序',
    templateExt: '.xhsml',
    styleExt: '.css',
    templateDir: 'xiaohongshu',
  },
  douyin: {
    id: 'douyin',
    label: '抖音小程序',
    templateExt: '.ttml',
    styleExt: '.ttss',
    templateDir: 'douyin',
  },
  baidu: {
    id: 'baidu',
    label: '百度小程序',
    templateExt: '.swan',
    styleExt: '.css',
    templateDir: 'baidu',
  },
  jd: {
    id: 'jd',
    label: '京东小程序',
    templateExt: '.jxml',
    styleExt: '.jxss',
    templateDir: 'jd',
  },
};

// ======================== 品牌扫描 ========================

export interface BrandInfo {
  /** 品牌名称（目录名） */
  name: string;
  /** 品牌 SVG 资源目录路径 */
  svgDir: string;
}

/**
 * 扫描 resources 目录下所有品牌文件夹
 * 品牌定义：resources 目录下包含 SVG 文件的子目录
 */
export function scanBrands(): BrandInfo[] {
  if (!fs.existsSync(RESOURCES_DIR)) {
    throw new Error(`资源目录不存在: ${RESOURCES_DIR}`);
  }

  const entries = fs.readdirSync(RESOURCES_DIR, { withFileTypes: true });
  const brands: BrandInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const svgDir = path.join(RESOURCES_DIR, entry.name);
    // 检查目录下是否有 SVG 文件
    const hasSvg = fs.readdirSync(svgDir).some((f) => f.endsWith('.svg'));
    if (hasSvg) {
      brands.push({ name: entry.name, svgDir });
    }
  }

  if (brands.length === 0) {
    throw new Error(`未在 ${RESOURCES_DIR} 下找到任何包含 SVG 文件的品牌目录`);
  }

  return brands;
}

// ======================== CLI 参数解析 ========================

export interface CLIArgs {
  platform: string;
}

/**
 * 解析命令行参数，获取平台标识
 * @returns 解析后的参数对象
 */
export function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  let platform = 'wechat';

  for (const arg of args) {
    if (arg === '--') continue;
    if (PLATFORMS[arg]) {
      platform = arg;
    }
  }

  return { platform };
}

/**
 * 获取平台配置，如果平台不存在则抛出错误
 * @param platformId 平台标识
 * @returns 平台配置
 */
export function getPlatformConfig(platformId: string): PlatformConfig {
  const platform = PLATFORMS[platformId];
  if (!platform) {
    throw new Error(`未知平台: ${platformId}，可选: ${Object.keys(PLATFORMS).join(', ')}`);
  }
  return platform;
}

// ======================== SVG 图标加载 ========================

export interface IconEntry {
  name: string;
  svg: string;
}

/**
 * 从 SVG 目录加载并解析所有图标
 */
export function loadIcons(svgDir: string): IconEntry[] {
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

/**
 * 加载品牌的所有图标，并打印日志
 */
export function loadAndFilterIcons(brand: BrandInfo): IconEntry[] {
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

// ======================== 模板文件读取 ========================

export interface PlatformTemplates {
  iconJsonTemplate: string;
  iconTemplateContent: string;
  iconJSSource: string;
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
export function loadPlatformTemplates(platformTemplateDir: string, platform: PlatformConfig): PlatformTemplates {
  try {
    const iconTemplateContent = findAndReadTemplate(
      path.join(platformTemplateDir, 'icon'),
      platform.templateExt
    );
    const iconJsonTemplate = readTemplateFile(platformTemplateDir, 'icon/index.json');
    const iconJSSource = readTemplateFile(platformTemplateDir, 'icon/index.js');

    return {
      iconJsonTemplate,
      iconTemplateContent,
      iconJSSource,
    };
  } catch (err) {
    throw new Error(
      `加载平台模板失败 [${platform.label}]: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

// ======================== 多品牌图标数据 ========================

export interface BrandIconsMap {
  [brandName: string]: IconEntry[];
}

/**
 * 生成合并后的 icons.js 源码
 * 结构：{ "brand1": { "icon1": "svg1", ... }, "brand2": { ... } }
 */
export function generateMergedIconsJS(brandsIcons: BrandIconsMap): string {
  const brandEntries: string[] = [];

  for (const [brandName, icons] of Object.entries(brandsIcons)) {
    const iconEntries = icons.map((icon) => `    ${JSON.stringify(icon.name)}: \`${icon.svg}\``);
    brandEntries.push(`  ${JSON.stringify(brandName)}: {\n${iconEntries.join(',\n')}\n  }`);
  }

  return `module.exports = {\n${brandEntries.join(',\n')}\n};\n`;
}

// ======================== 目录清理 ========================

/**
 * 清理输出目录（保留 package.json 和 README.md）
 */
export async function cleanOutputDir(outputDir: string): Promise<void> {
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

/**
 * 完全清理目录（不保留任何文件）
 */
export function cleanDistDir(distDir: string): void {
  if (fs.existsSync(distDir)) {
    fs.removeSync(distDir);
  }
  fs.ensureDirSync(distDir);
}

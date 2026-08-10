import fs from 'fs-extra';
import path from 'path';
import { parseSvg, generateSvg } from './utils/svgTotemplate';
import { optimizeSvg } from './utils/svgOptimizer';
import { processOpacityOverlap } from './utils/opacityOverlap';
import { detectOpacityOverlapPaintTypes } from './utils/detectOpacityOverlap';
import { computeOverlapPlanAttr, injectCutAttr } from './utils/opacityOverlapPlan';

// ======================== 路径常量 ========================

const SCRIPTS_DIR = __dirname;
export const ROOT_DIR = path.resolve(SCRIPTS_DIR, '..');
export const PACKAGES_DIR = path.resolve(ROOT_DIR, 'packages');
export const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
export const RESOURCES_DIR = path.resolve(ROOT_DIR, 'resources');
const TEMPLATE_DIR = path.resolve(SCRIPTS_DIR, 'template');

// ======================== 平台配置 ========================

/** 组件 API 风格 */
export type ComponentAPIStyle = 'wechat' | 'alipay';

export interface PlatformConfig {
  /** 平台标识 */
  id: string;
  /** 平台显示名 */
  label: string;
  /** 模板文件后缀：模板 */
  templateExt: string;
  /** 模板文件后缀：样式 */
  styleExt: string;
  /** 组件 API 风格：wechat（properties/observers）或 alipay（props/didMount/didUpdate） */
  componentStyle: ComponentAPIStyle;
  /** svgDataUri 编码时是否需要额外的 .replace(/"/g, "'") */
  escapeQuotes: boolean;
}

export const PLATFORMS: Record<string, PlatformConfig> = {
  wechat: {
    id: 'wechat',
    label: '微信小程序',
    templateExt: '.wxml',
    styleExt: '.wxss',
    componentStyle: 'wechat',
    escapeQuotes: false,
  },
  alipay: {
    id: 'alipay',
    label: '支付宝小程序',
    templateExt: '.axml',
    styleExt: '.acss',
    componentStyle: 'alipay',
    escapeQuotes: false,
  },
  kuaishou: {
    id: 'kuaishou',
    label: '快手小程序',
    templateExt: '.ksml',
    styleExt: '.css',
    componentStyle: 'wechat',
    escapeQuotes: false,
  },
  xiaohongshu: {
    id: 'xiaohongshu',
    label: '小红书小程序',
    templateExt: '.xhsml',
    styleExt: '.css',
    componentStyle: 'wechat',
    escapeQuotes: false,
  },
  douyin: {
    id: 'douyin',
    label: '抖音小程序',
    templateExt: '.ttml',
    styleExt: '.ttss',
    componentStyle: 'wechat',
    escapeQuotes: true,
  },
  baidu: {
    id: 'baidu',
    label: '百度小程序',
    templateExt: '.swan',
    styleExt: '.css',
    componentStyle: 'wechat',
    escapeQuotes: true,
  },
  jd: {
    id: 'jd',
    label: '京东小程序',
    templateExt: '.jxml',
    styleExt: '.jxss',
    componentStyle: 'wechat',
    escapeQuotes: false,
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

export interface SvgEntry {
  name: string;
  svg: string;
}

/**
 * 从 SVG 目录加载并解析所有图标
 * 流程：读取 SVG -> SVGO 预压缩 -> 解析并生成模板
 *
 * 透明度重叠处理策略按平台区分：
 * - 微信（原型验证）：build 时只产出极小的「挖除计划」（`data-cut` 属性），不注入任何
 *   mask/defs；真正的挖除推迟到运行时，仅当用户传入颜色确实带alpha 时才现算现用，
 *   多数不透明色场景零开销。详见 `opacityOverlapPlan.ts` 与 `wechat.js.tpl`。
 * - 其他平台：保持现有的 build 时静态注入 mask+use 方案（`opacityOverlap.ts`），行为
 *   不受本次原型改动影响。
 */
export function loadSvgs(svgDir: string, platformId?: string): SvgEntry[] {
  if (!fs.existsSync(svgDir)) {
    throw new Error(`SVG directory not found: ${svgDir}`);
  }

  const svgFiles = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'));

  // 用目录名作为 brand 前缀，保证跨品牌同名图标的检测缓存 key 唯一
  const brandKey = path.basename(svgDir);
  const useRuntimeCut = platformId === 'wechat';

  const icons: SvgEntry[] = [];
  for (const file of svgFiles) {
    try {
      const filePath = path.join(svgDir, file);
      const originalContent = fs.readFileSync(filePath, 'utf-8');
      const name = path.basename(file, '.svg');

      // 使用 SVGO 进行预压缩
      const optimizedContent = optimizeSvg(originalContent, file);

      if (useRuntimeCut) {
        // 原型：基于生成好的最终模板结构计算挖除计划，确保计划中的下标与运行时
        // （utils.js.tpl）解析到的兄弟结构严格一致，再以 data-cut 属性挂载
        const templated = generateSvg(parseSvg(optimizedContent), name);
        const paintTypes = detectOpacityOverlapPaintTypes(optimizedContent, `${brandKey}/${name}`);
        const planAttr = computeOverlapPlanAttr(templated, paintTypes);
        icons.push({ name, svg: planAttr ? injectCutAttr(templated, planAttr) : templated });
        continue;
      }

      // 处理透明度重叠：检测到几何重叠时注入 luminance mask 挖除上层覆盖区域，
      // 避免运行时传入半透明色时重叠区透明度叠加变深
      const overlapProcessed = processOpacityOverlap(optimizedContent, `${brandKey}/${name}`);
      icons.push({ name, svg: generateSvg(parseSvg(overlapProcessed), name) });
    } catch (err) {
      console.error(`  ⚠️  处理失败: ${file}`, err instanceof Error ? err.message : String(err));
    }
  }

  return icons;
}

/**
 * 加载品牌的所有图标，并打印日志
 */
export function loadAllSvgs(brand: BrandInfo, platformId?: string): SvgEntry[] {
  console.log(`📂 读取 SVG 图标: ${brand.svgDir}`);

  const svgFiles = fs.readdirSync(brand.svgDir).filter((f) => f.endsWith('.svg'));
  console.log(`📄 发现 ${svgFiles.length} 个 SVG 文件`);

  const icons = loadSvgs(brand.svgDir, platformId);

  if (icons.length < svgFiles.length) {
    const missing = svgFiles.length - icons.length;
    console.warn(`⚠️  有 ${missing} 个 SVG 文件解析失败，请检查上方日志`);
  }

  console.log(`✅ 成功解析 ${icons.length} 个图标\n`);
  return icons;
}

// ======================== 模板动态生成 ========================

export interface PlatformTemplates {
  iconJsonTemplate: string;
  iconTemplateContent: string;
  iconJSSource: string;
  /** 运行时按需挖除等工具函数模块源码；componentStyle 为 'wechat' 风格的平台才需要（index.js 会 require('./utils')） */
  iconUtilsJSSource: string | null;
}

/** 读取模板文件 */
function readTemplate(filename: string): string {
  return fs.readFileSync(path.join(TEMPLATE_DIR, filename), 'utf-8');
}

/** 根据平台配置生成所有模板内容 */
export function generatePlatformTemplates(platform: PlatformConfig): PlatformTemplates {
  const jsTplFile = platform.componentStyle === 'alipay' ? 'alipay.js.tpl' : 'wechat.js.tpl';
  const extraReplace = platform.escapeQuotes ? `.replace(/"/g, "'")` : '';

  return {
    iconJsonTemplate: readTemplate('icon.json.tpl'),
    iconTemplateContent: readTemplate('icon.tpl'),
    iconJSSource: readTemplate(jsTplFile).replace(/\{\{EXTRA_REPLACE\}\}/g, extraReplace),
    // wechat.js.tpl 内部会 require('./utils')，需同步生成 utils.js；alipay.js.tpl 不依赖它
    iconUtilsJSSource: platform.componentStyle === 'alipay' ? null : readTemplate('utils.js.tpl'),
  };
}

// ======================== 多品牌图标数据 ========================

export interface BrandIconsMap {
  [brandName: string]: SvgEntry[];
}

/**
 * 生成 icons.js 源码
 * 结构：{ "brand1": { "icon1": "svg1", ... }, "brand2": { ... } }
 */
export function generateIconsJS(brandsIcons: BrandIconsMap): string {
  const brandEntries: string[] = [];

  for (const [brandName, icons] of Object.entries(brandsIcons)) {
    const iconEntries = icons.map((icon) => `    ${JSON.stringify(icon.name)}: \`${icon.svg}\``);
    brandEntries.push(`  ${JSON.stringify(brandName)}: {\n${iconEntries.join(',\n')}\n  }`);
  }

  return `module.exports = {\n${brandEntries.join(',\n')}\n};\n`;
}

// ======================== 目录清理 ========================

/** 清理时需要保留的文件 */
const PRESERVE_FILES = new Set(['package.json', 'README.md', '.changelog', 'CHANGELOG.md']);

/**
 * 清理输出目录（保留 package.json、README.md、.changelog）
 */
export async function cleanOutputDir(outputDir: string): Promise<void> {
  if (!fs.existsSync(outputDir)) {
    fs.ensureDirSync(outputDir);
    return;
  }

  const items = fs.readdirSync(outputDir);
  const removePromises: Promise<void>[] = [];

  for (const item of items) {
    if (PRESERVE_FILES.has(item)) continue;
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

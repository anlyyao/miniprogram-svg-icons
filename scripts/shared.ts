import fs from 'fs-extra';
import path from 'path';

// ======================== 路径常量 ========================

export const SCRIPTS_DIR = __dirname;
export const ROOT_DIR = path.resolve(SCRIPTS_DIR, '..');
export const PACKAGES_DIR = path.resolve(ROOT_DIR, 'packages');
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
  /** 组件复用机制：behaviors（微信/快手）或 mixins（支付宝） */
  reuseKey: 'behaviors' | 'mixins';
  /** 模板目录名（对应 template/{platform}/） */
  templateDir: string;
}

export const PLATFORMS: Record<string, PlatformConfig> = {
  wechat: {
    id: 'wechat',
    label: '微信小程序',
    templateExt: '.wxml',
    styleExt: '.wxss',
    reuseKey: 'behaviors',
    templateDir: 'wechat',
  },
  alipay: {
    id: 'alipay',
    label: '支付宝小程序',
    templateExt: '.axml',
    styleExt: '.acss',
    reuseKey: 'mixins',
    templateDir: 'alipay',
  },
  kuaishou: {
    id: 'kuaishou',
    label: '快手小程序',
    templateExt: '.ksml',
    styleExt: '.css',
    reuseKey: 'behaviors',
    templateDir: 'kuaishou',
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

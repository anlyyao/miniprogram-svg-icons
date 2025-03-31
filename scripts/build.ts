import { minify as terserMinify } from 'terser';
import fs from 'fs-extra';
import path from 'path';
import {
  ROOT_DIR,
  PACKAGES_DIR,
  BrandInfo,
  scanBrands,
  parseArgs,
  getPlatformConfig,
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

// ======================== 构建函数 ========================

export interface BuildResult {
  duration: number;
  platform: string;
  sourceDir: string;
  distDir: string;
  brands: string[];
}

/** 清理 dist 目录 */
function cleanDistDir(distDir: string): void {
  if (fs.existsSync(distDir)) {
    fs.removeSync(distDir);
  }
  fs.ensureDirSync(distDir);
}

/** 压缩 JS 文件 */
async function minifyJSFile(sourceFile: string, distFile: string, isIconsJs: boolean = false): Promise<void> {
  const source = await fs.readFile(sourceFile, 'utf-8');

  const options = isIconsJs ? TERSER_OPTIONS_TEMPLATE_LITERAL : TERSER_OPTIONS;
  const minified = await terserMinify(source, options);
  await fs.writeFile(distFile, minified.code || source);
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

// ======================== 文件收集 ========================

interface FileTask {
  sourcePath: string;
  distPath: string;
  type: 'js' | 'json' | 'template' | 'copy';
  isIconsJs?: boolean;
}

/** 递归收集所有需要处理的文件，同时创建目标目录结构 */
function collectFiles(sourceDir: string, distDir: string, templateExt: string): FileTask[] {
  const tasks: FileTask[] = [];

  function traverse(srcDir: string, dstDir: string): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(srcDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const sourcePath = path.join(srcDir, entry.name);
      const distPath = path.join(dstDir, entry.name);

      if (entry.isDirectory()) {
        fs.ensureDirSync(distPath);
        traverse(sourcePath, distPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);

        if (ext === '.js') {
          tasks.push({
            sourcePath,
            distPath,
            type: 'js',
            isIconsJs: entry.name.endsWith('-icons.js'),
          });
        } else if (ext === '.json') {
          tasks.push({ sourcePath, distPath, type: 'json' });
        } else if (ext === templateExt) {
          tasks.push({ sourcePath, distPath, type: 'template' });
        } else {
          tasks.push({ sourcePath, distPath, type: 'copy' });
        }
      }
    }
  }

  traverse(sourceDir, distDir);
  return tasks;
}

// ======================== 文件处理 ========================

/** 递归处理目录 */
async function processDirectory(sourceDir: string, distDir: string, templateExt: string): Promise<void> {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`源目录不存在: ${sourceDir}\n请先运行 generate 脚本生成组件库`);
  }

  // 1. 收集所有文件
  const fileTasks = collectFiles(sourceDir, distDir, templateExt);

  if (fileTasks.length === 0) {
    return;
  }

  const jsTasks: FileTask[] = [];
  const syncTasks: FileTask[] = [];

  for (const task of fileTasks) {
    if (task.type === 'js') {
      jsTasks.push(task);
    } else {
      syncTasks.push(task);
    }
  }

  for (const task of syncTasks) {
    const { sourcePath, distPath, type } = task;
    switch (type) {
      case 'json': {
        const source = fs.readFileSync(sourcePath, 'utf-8');
        fs.writeFileSync(distPath, minifyJSON(source));
        break;
      }
      case 'template': {
        const source = fs.readFileSync(sourcePath, 'utf-8');
        fs.writeFileSync(distPath, minifyTemplate(source));
        break;
      }
      case 'copy':
        fs.copyFileSync(sourcePath, distPath);
        break;
    }
  }

  // 3. JS 任务并行处理
  if (jsTasks.length > 0) {
    const jsPromises = jsTasks.map(task => async () => {
      await minifyJSFile(task.sourcePath, task.distPath, task.isIconsJs || false);
    });

    await pLimit(jsPromises, CONCURRENCY_LIMIT);
  }
}

// ======================== 品牌构建信息 ========================

interface BrandBuildInfo extends BrandInfo {
  /** 品牌源目录路径（packages/{platform}/{brand}/） */
  sourceDir: string;
}

/**
 * 获取品牌构建信息
 * 在 scanBrands 基础上添加 sourceDir 属性
 */
function getBrandBuildInfos(platformSourceDir: string): BrandBuildInfo[] {
  const brands = scanBrands();
  const buildInfos: BrandBuildInfo[] = [];

  for (const brand of brands) {
    const sourceDir = path.join(platformSourceDir, brand.name);
    if (fs.existsSync(sourceDir)) {
      buildInfos.push({ ...brand, sourceDir });
    }
  }

  if (buildInfos.length === 0) {
    throw new Error(`未在 ${platformSourceDir} 下找到任何品牌目录，请先运行 generate 脚本`);
  }

  return buildInfos;
}

// ======================== 主构建入口 ========================

/**
 * 编译压缩小程序图标组件包
 * 将 packages/{platform}/ 的源码编译压缩到 dist/{platform}/
 *
 * @param platformId - 平台标识（wechat / alipay / kuaishou）
 */
export async function build(platformId: string = 'wechat'): Promise<BuildResult> {
  const platform = getPlatformConfig(platformId);

  const start = Date.now();
  const platformSourceDir = path.resolve(PACKAGES_DIR, platformId);
  const platformDistDir = path.resolve(ROOT_DIR, 'dist', platformId);

  console.log(`\n📦 编译打包平台: ${platform.label} (${platformId})`);
  console.log(`📂 源目录: ${platformSourceDir}`);
  console.log(`📁 输出目录: ${platformDistDir}`);

  // -------- 0. 清理 dist 目录 --------
  cleanDistDir(platformDistDir);

  // -------- 1. 扫描所有品牌（从 resources 目录） --------
  const brands = getBrandBuildInfos(platformSourceDir);
  const brandNames = new Set(brands.map((b) => b.name));
  console.log(`\n🔍 发现 ${brands.length} 个品牌: ${brands.map((b) => b.name).join(', ')}`);

  // -------- 2. 处理公共目录（非品牌目录） --------
  const platformEntries = fs.readdirSync(platformSourceDir, { withFileTypes: true });
  for (const entry of platformEntries) {
    if (!entry.isDirectory()) continue;
    // 跳过品牌目录
    if (brandNames.has(entry.name)) continue;

    const sharedSourceDir = path.join(platformSourceDir, entry.name);
    const sharedDistDir = path.join(platformDistDir, entry.name);

    console.log(`\n  📁 公共目录: ${entry.name}`);
    fs.ensureDirSync(sharedDistDir);
    await processDirectory(sharedSourceDir, sharedDistDir, platform.templateExt);
    console.log(`  ✅ [${entry.name}] 打包完成`);
  }

  // -------- 3. 为每个品牌编译压缩 --------
  console.log('');
  for (const brand of brands) {
    const brandDistDir = path.join(platformDistDir, brand.name);
    console.log(`  🎨 品牌: ${brand.name}`);
    console.log(`  📂 源目录: ${brand.sourceDir}`);
    console.log(`  📁 输出目录: ${brandDistDir}\n`);

    fs.ensureDirSync(brandDistDir);
    await processDirectory(brand.sourceDir, brandDistDir, platform.templateExt);
    console.log(`  ✅ [${brand.name}] 打包完成\n`);
  }

  // -------- 4. 复制平台 README 文件到产物中 --------
  const readmePath = path.resolve(platformSourceDir, 'README.md');
  const distReadmePath = path.resolve(platformDistDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, distReadmePath);
    console.log(`📄 已复制 README.md 到产物目录`);
  } else {
    console.log(`⚠️  未找到 ${readmePath}，跳过 README 复制`);
  }

  // -------- 5. 复制平台 package.json 文件到产物中 --------
  const packageJsonPath = path.resolve(platformSourceDir, 'package.json');
  const distPackageJsonPath = path.resolve(platformDistDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    fs.copyFileSync(packageJsonPath, distPackageJsonPath);
    console.log(`📄 已复制 package.json 到产物目录`);
  } else {
    console.log(`⚠️  未找到 ${packageJsonPath}，跳过 package.json 复制`);
  }

  const duration = (Date.now() - start) / 1000;
  console.log(`✅ [${platform.label}] 全部品牌打包完成`);
  console.log(`⏱️  耗时: ${duration.toFixed(1)}s\n`);

  return { duration, platform: platformId, sourceDir: platformSourceDir, distDir: platformDistDir, brands: brands.map((b) => b.name) };
}

// ======================== CLI 入口 ========================

if (require.main === module) {
  const { platform } = parseArgs();
  build(platform).catch((err) => {
    console.error('❌ 打包失败:', err);
    process.exit(1);
  });
}

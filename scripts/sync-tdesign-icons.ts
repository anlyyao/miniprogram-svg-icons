import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

/**
 * 从 tdesign-icons 仓库同步 SVG 原始资源到本仓 resources/tdesign
 *
 * 源（上游）：
 *   - git@github.com:Tencent/tdesign-icons.git 的 svg/ 目录（图标原始 SVG 来）
 * 目标（本仓）：
 *   - resources/tdesign
 *
 * 用法：
 *   tsx scripts/sync-tdesign-icons.ts                 # 从 GitHub sparse-checkout 拉取 svg/ 并写入
 *   tsx scripts/sync-tdesign-icons.ts --dry-run       # 只预览变更，不写入
 *
 */

const ROOT_DIR = path.resolve(__dirname, '..');
const TARGET_DIR = path.resolve(ROOT_DIR, 'resources/tdesign');
const DEFAULT_REMOTE_URL = 'https://github.com/Tencent/tdesign-icons.git';

interface SyncOptions {
  dryRun: boolean;
  remoteUrl: string;
}

function parseArgs(): SyncOptions {
  const args = process.argv.slice(2);
  return {
    dryRun: args.includes('--dry-run') || args.includes('-n'),
    remoteUrl: process.env.TDESIGN_ICONS_GIT_URL || DEFAULT_REMOTE_URL,
  };
}

/** 通过 sparse-checkout 仅拉取远程仓库的 svg/ 目录到临时目录，返回该目录路径 */
function fetchRemoteSvg(remoteUrl: string): string {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tdesign-icons-'));
  console.log(`🌐 从远程仓库 sparse-checkout: ${remoteUrl}`);
  console.log(`   📁 临时目录: ${tmpRoot}`);

  try {
    execSync(`git clone --depth 1 --filter=blob:none --sparse ${remoteUrl} ${tmpRoot}`, { stdio: 'inherit' });
    execSync(`git -C ${tmpRoot} sparse-checkout set svg`, { stdio: 'inherit' });
  } catch (err) {
    fs.removeSync(tmpRoot);
    throw new Error(`远程拉取失败: ${err instanceof Error ? err.message : String(err)}`);
  }

  return path.join(tmpRoot, 'svg');
}

/** 递归收集目录下所有 .svg 文件的相对路径（用于 diff 与拷贝） */
function collectSvgFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.svg')) {
        results.push(path.relative(dir, full));
      }
    }
  };
  walk(dir);
  return results;
}

/** 读取并比较内容，返回 [新增, 修改, 删除] 三组相对路径 */
function diffSync(sourceDir: string, targetDir: string) {
  const sourceFiles = collectSvgFiles(sourceDir);
  const targetFiles = collectSvgFiles(targetDir);

  const sourceSet = new Set(sourceFiles);
  const targetSet = new Set(targetFiles);

  const added = sourceFiles.filter((f) => !targetSet.has(f));
  const removed = targetFiles.filter((f) => !sourceSet.has(f));
  const changed = sourceFiles.filter((f) => {
    if (!targetSet.has(f)) return false;
    return fs.readFileSync(path.join(sourceDir, f), 'utf-8') !== fs.readFileSync(path.join(targetDir, f), 'utf-8');
  });

  return { added, removed, changed, sourceCount: sourceFiles.length, targetCount: targetFiles.length };
}

/** 执行同步：删除多余、写入新增与更新 */
function applySync(sourceDir: string, targetDir: string, diff: ReturnType<typeof diffSync>, dryRun: boolean) {
  fs.ensureDirSync(targetDir);

  const doRemove = (rel: string) => {
    const p = path.join(targetDir, rel);
    if (dryRun) return;
    fs.removeSync(p);
  };
  const doCopy = (rel: string) => {
    const src = path.join(sourceDir, rel);
    const dest = path.join(targetDir, rel);
    if (dryRun) return;
    fs.ensureDirSync(path.dirname(dest));
    fs.copyFileSync(src, dest);
  };

  for (const f of diff.removed) doRemove(f);
  for (const f of diff.added) doCopy(f);
  for (const f of diff.changed) doCopy(f);
}

function main() {
  const opts = parseArgs();
  const sourceDir = fetchRemoteSvg(opts.remoteUrl);

  if (!fs.readdirSync(sourceDir).some((f) => f.endsWith('.svg'))) {
    console.error(`❌ 源目录中未找到任何 SVG 文件: ${sourceDir}`);
    process.exit(1);
  }

  console.log(`📥 源目录: ${sourceDir}`);
  console.log(`📤 目标目录: ${TARGET_DIR}`);
  console.log(opts.dryRun ? '🔍 模式: dry-run（仅预览，不写入）\n' : '');

  const diff = diffSync(sourceDir, TARGET_DIR);
  console.log(`   源 SVG 数量: ${diff.sourceCount}`);
  console.log(`   目标 SVG 数量: ${diff.targetCount}`);
  console.log(`   新增: ${diff.added.length} | 修改: ${diff.changed.length} | 删除: ${diff.removed.length}\n`);

  if (diff.added.length) {
    console.log('➕ 新增:');
    diff.added.forEach((f) => console.log(`   ${f}`));
  }
  if (diff.changed.length) {
    console.log('✏️  修改:');
    diff.changed.forEach((f) => console.log(`   ${f}`));
  }
  if (diff.removed.length) {
    console.log('➖ 删除:');
    diff.removed.forEach((f) => console.log(`   ${f}`));
  }

  if (diff.added.length === 0 && diff.changed.length === 0 && diff.removed.length === 0) {
    console.log('\n✅ 已是最新，无需同步');
    return;
  }

  applySync(sourceDir, TARGET_DIR, diff, opts.dryRun);

  if (opts.dryRun) {
    console.log('\n🔍 dry-run 完成，未做任何修改');
  } else {
    console.log(`\n✅ 同步完成：新增 ${diff.added.length}，修改 ${diff.changed.length}，删除 ${diff.removed.length}`);
    console.log('   可执行 `pnpm generate` / `pnpm build` 重新生成组件');
  }
}

if (require.main === module) {
  main();
}

export { diffSync, collectSvgFiles };

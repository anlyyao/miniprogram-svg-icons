import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import readline from 'readline';

// ======================== 配置 ========================

/** 支持的框架列表 */
const FRAMEWORKS = ['wechat', 'alipay', 'kuaishou', 'douyin', 'baidu', 'jd', 'xiaohongshu', 'utils'] as const;
type Framework = (typeof FRAMEWORKS)[number];

const VERSION_BUMPS = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease', 'custom'] as const;
type VersionBump = (typeof VERSION_BUMPS)[number];

const ROOT_DIR = path.resolve(__dirname, '..');

/** 获取指定框架的子包信息 */
function getPackageConfig(framework: Framework) {
  const configs: Record<Framework, { pkgDir: string; distDir: string; buildCmd: string }> = {
    wechat: {
      pkgDir: 'packages/wechat',
      distDir: 'dist/wechat',
      buildCmd: 'build:wechat',
    },
    alipay: {
      pkgDir: 'packages/alipay',
      distDir: 'dist/alipay',
      buildCmd: 'build:alipay',
    },
    kuaishou: {
      pkgDir: 'packages/kuaishou',
      distDir: 'dist/kuaishou',
      buildCmd: 'build:kuaishou',
    },
    douyin: {
      pkgDir: 'packages/douyin',
      distDir: 'dist/douyin',
      buildCmd: 'build:douyin',
    },
    baidu: {
      pkgDir: 'packages/baidu',
      distDir: 'dist/baidu',
      buildCmd: 'build:baidu',
    },
    jd: { pkgDir: 'packages/jd', distDir: 'dist/jd', buildCmd: 'build:jd' },
    xiaohongshu: {
      pkgDir: 'packages/xiaohongshu',
      distDir: 'dist/xiaohongshu',
      buildCmd: 'build:xiaohongshu',
    },
    utils: {
      pkgDir: 'packages/utils',
      distDir: 'dist/utils',
      buildCmd: 'build:utils',
    },
  };
  return configs[framework];
}

// ======================== ANSI 辅助 ========================

const ESC = '\x1B[';
const CLEAR_LINE = `${ESC}2K`;
const HIDE_CURSOR = `${ESC}?25l`;
const SHOW_CURSOR = `${ESC}?25h`;
const CYAN = `${ESC}36m`;
const GREEN = `${ESC}32m`;
const DIM = `${ESC}2m`;
const BOLD = `${ESC}1m`;
const RESET = `${ESC}0m`;

function moveCursorUp(n: number): string {
  return n > 0 ? `${ESC}${n}A` : '';
}

// ======================== 交互组件 ========================

/**
 * 单选列表：上/下键移动，回车确认
 */
function selectOne<T extends string>(title: string, items: { label: string; value: T }[]): Promise<T> {
  return new Promise((resolve) => {
    let cursor = 0;

    function render() {
      // 移回起始行并重绘
      if (cursor >= 0) {
        process.stdout.write(moveCursorUp(items.length));
      }
      for (let i = 0; i < items.length; i++) {
        const prefix = i === cursor ? `${CYAN}❯${RESET}` : ' ';
        const label = i === cursor ? `${CYAN}${items[i].label}${RESET}` : `${DIM}${items[i].label}${RESET}`;
        process.stdout.write(`${CLEAR_LINE}  ${prefix} ${label}\n`);
      }
    }

    process.stdout.write(`${BOLD}${title}${RESET}\n`);
    process.stdout.write(HIDE_CURSOR);
    // 先打空行占位
    for (let i = 0; i < items.length; i++) process.stdout.write('\n');
    render();

    const rl = readline.createInterface({ input: process.stdin });
    process.stdin.setRawMode(true);
    process.stdin.resume();

    const onKeypress = (buf: Buffer) => {
      const key = buf.toString();
      // 上键
      if (key === '\x1B[A') {
        cursor = (cursor - 1 + items.length) % items.length;
        render();
      }
      // 下键
      else if (key === '\x1B[B') {
        cursor = (cursor + 1) % items.length;
        render();
      }
      // 回车
      else if (key === '\r' || key === '\n') {
        cleanup();
        // 打印最终选择结果
        process.stdout.write(moveCursorUp(items.length));
        for (let i = 0; i < items.length; i++) {
          process.stdout.write(`${CLEAR_LINE}`);
          if (i < items.length - 1) process.stdout.write('\n');
        }
        process.stdout.write(moveCursorUp(items.length - 1));
        process.stdout.write(`${CLEAR_LINE}  ${GREEN}✔${RESET} ${items[cursor].label}\n`);
        resolve(items[cursor].value);
      }
      // Ctrl+C
      else if (key === '\x03') {
        cleanup();
        process.stdout.write('\n⏹️  已取消\n');
        process.exit(0);
      }
    };

    const cleanup = () => {
      process.stdin.removeListener('data', onKeypress);
      process.stdin.setRawMode(false);
      process.stdout.write(SHOW_CURSOR);
      rl.close();
    };

    process.stdin.on('data', onKeypress);
  });
}

/**
 * 确认提示：y/n 按键，回车默认选否
 */
function confirm(message: string, defaultYes = false): Promise<boolean> {
  return new Promise((resolve) => {
    const hint = defaultYes ? 'Y/n' : 'y/N';
    process.stdout.write(`${BOLD}${message}${RESET} ${DIM}(${hint})${RESET} `);

    const rl = readline.createInterface({ input: process.stdin });
    process.stdin.setRawMode(true);
    process.stdin.resume();

    const onKeypress = (buf: Buffer) => {
      const key = buf.toString().toLowerCase();
      if (key === 'y') {
        cleanup();
        process.stdout.write(`${GREEN}Yes${RESET}\n`);
        resolve(true);
      } else if (key === 'n') {
        cleanup();
        process.stdout.write('No\n');
        resolve(false);
      } else if (key === '\r' || key === '\n') {
        cleanup();
        if (defaultYes) {
          process.stdout.write(`${GREEN}Yes${RESET}\n`);
        } else {
          process.stdout.write('No\n');
        }
        resolve(defaultYes);
      } else if (key === '\x03') {
        cleanup();
        process.stdout.write('\n⏹️  已取消\n');
        process.exit(0);
      }
    };

    const cleanup = () => {
      process.stdin.removeListener('data', onKeypress);
      process.stdin.setRawMode(false);
      process.stdout.write(SHOW_CURSOR);
      rl.close();
    };

    process.stdin.on('data', onKeypress);
  });
}

/**
 * 文本输入（用于自定义版本号等场景）
 */
function textInput(message: string, defaultValue?: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const hint = defaultValue ? ` ${DIM}(${defaultValue})${RESET}` : '';
    rl.question(`${BOLD}${message}${RESET}${hint} `, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

// ======================== 工具函数 ========================

function run(cmd: string, cwd: string = ROOT_DIR): string {
  console.log(`\n  $ ${cmd}`);
  return execSync(cmd, { cwd, stdio: 'inherit', encoding: 'utf-8' }) ?? '';
}

function readPkg(pkgDir: string): {
  name: string;
  version: string;
  [k: string]: unknown;
} {
  return fs.readJSONSync(path.join(pkgDir, 'package.json'));
}

function writePkg(pkgDir: string, pkg: Record<string, unknown>): void {
  fs.writeJSONSync(path.join(pkgDir, 'package.json'), pkg, { spaces: 2 });
  const filePath = path.join(pkgDir, 'package.json');
  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content.endsWith('\n')) {
    fs.writeFileSync(filePath, content + '\n');
  }
}

/** 根据 semver 规则计算新版本号 */
function bumpVersion(current: string, bump: VersionBump, customVersion?: string): string {
  if (bump === 'custom') {
    if (!customVersion) throw new Error('自定义版本号不能为空');
    return customVersion;
  }

  const preId = 'beta';
  const parts = current.replace(/-.*$/, '').split('.').map(Number);
  const [major, minor, patch] = parts;

  switch (bump) {
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'major':
      return `${major + 1}.0.0`;
    case 'prepatch':
      return `${major}.${minor}.${patch + 1}-${preId}.0`;
    case 'preminor':
      return `${major}.${minor + 1}.0-${preId}.0`;
    case 'premajor':
      return `${major + 1}.0.0-${preId}.0`;
    case 'prerelease': {
      const preMatch = current.match(/-(\w+)\.(\d+)$/);
      if (preMatch) {
        return `${major}.${minor}.${patch}-${preMatch[1]}.${Number(preMatch[2]) + 1}`;
      }
      return `${major}.${minor}.${patch + 1}-${preId}.0`;
    }
    default:
      throw new Error(`未知的版本升级类型: ${bump}`);
  }
}

/** 将 dist-tag（非 latest）追加为版本的 prerelease 标识，如 0.0.1 + beta → 0.0.1-beta.0 */
function applyDistTag(version: string, distTag: string): string {
  if (distTag === 'latest') return version;
  // 移除已有的 prerelease 部分
  const cleanVersion = version.replace(/-.*$/, '');
  const preMatch = version.match(/-(\w+)\.(\d+)$/);
  // 复用已有的 prerelease 序号
  const preNum = preMatch ? Number(preMatch[2]) : 0;
  return `${cleanVersion}-${distTag}.${preNum}`;
}

// ======================== 主流程 ========================

/** 解析命令行参数中的 --framework 值 */
function parseFrameworkArg(): Framework | null {
  const args = process.argv.slice(2);
  const idx = args.indexOf('--framework');
  if (idx === -1) return null;

  const value = args[idx + 1];
  if (!value) {
    console.error('❌ --framework 参数缺少值，可选值: ' + FRAMEWORKS.join(', '));
    process.exit(1);
  }

  const framework = value.trim() as Framework;
  if (!FRAMEWORKS.includes(framework)) {
    console.error(`❌ 不支持的框架: ${framework}，可选值: ${FRAMEWORKS.join(', ')}`);
    process.exit(1);
  }

  return framework;
}

async function main(): Promise<void> {
  try {
    console.log(`\n${BOLD}🚀 miniprogram-icons 发布工具${RESET}\n`);

    // -------- 1. 选择框架 --------
    let targetFramework: Framework;

    const cliFramework = parseFrameworkArg();
    if (cliFramework) {
      console.log(`🎯 目标框架 (命令行指定): ${GREEN}${cliFramework}${RESET}\n`);
      targetFramework = cliFramework;
    } else {
      const frameworkItems = FRAMEWORKS.map((f) => ({ label: f, value: f }));
      targetFramework = await selectOne<Framework>('🎯 选择要发布的框架:', frameworkItems);
    }

    // 获取子包配置
    const pkgConfig = getPackageConfig(targetFramework);
    const pkgDir = path.join(ROOT_DIR, pkgConfig.pkgDir);
    const distDir = path.join(ROOT_DIR, pkgConfig.distDir);
    const pkgJson = readPkg(pkgDir);

    // -------- 2. 展示要发布的子包 --------
    console.log('\n📦 将要发布的子包:');
    console.log(`  ${GREEN}✔${RESET} ${pkgJson.name} ${DIM}(${pkgJson.version})${RESET}\n`);

    // -------- 3. 选择版本号升级策略 --------
    const bumpItems = VERSION_BUMPS.map((b) => {
      let preview = '';
      try {
        if (b !== 'custom') {
          const bumped = bumpVersion(pkgJson.version, b);
          preview = ` ${DIM}(${pkgJson.version} → ${bumped})${RESET}`;
        }
      } catch {
        /* ignore */
      }
      return { label: `${b}${preview}`, value: b };
    });

    const bump = await selectOne<VersionBump>('\n📌 选择版本号升级策略:', bumpItems);

    let customVersion: string | undefined;
    if (bump === 'custom') {
      customVersion = await textInput('请输入版本号 (如 1.2.3):');
      if (!customVersion?.match(/^\d+\.\d+\.\d+(-[\w.]+)?$/)) {
        console.error('❌ 版本号格式无效，应为 x.y.z 或 x.y.z-tag.n');
        process.exit(1);
      }
    }

    // -------- 4. 选择 npm dist-tag --------
    const distTagItems = [
      { label: 'latest', value: 'latest' },
      { label: 'beta', value: 'beta' },
      { label: 'next', value: 'next' },
      { label: 'alpha', value: 'alpha' },
    ];
    const distTag = await selectOne('\n🏷️  选择 npm dist-tag:', distTagItems);

    // -------- 5. 计算新版本 --------
    const bumpedVersion = bumpVersion(pkgJson.version, bump, customVersion);
    const newVersion = applyDistTag(bumpedVersion, distTag);

    // -------- 6. 是否 dry-run --------
    const isDryRun = await confirm('\n🧪 仅模拟运行 (dry-run)?');

    // -------- 7. 发布摘要 & 最终确认 --------
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`${BOLD}📋 发布摘要${RESET}\n`);
    console.log(`  框架     : ${CYAN}${targetFramework}${RESET}`);
    console.log(`  ${pkgJson.name}: ${DIM}${pkgJson.version}${RESET} → ${GREEN}${newVersion}${RESET}`);
    if (distTag !== 'latest') {
      console.log(`\n  ${DIM}※ 非 latest dist-tag，已将 ${distTag} 追加到版本号中${RESET}`);
    }
    console.log(`\n  dist-tag : ${CYAN}${distTag}${RESET}`);
    console.log(`  dry-run  : ${isDryRun ? `${CYAN}是${RESET}` : '否'}`);
    console.log(`${'─'.repeat(50)}`);

    const ok = await confirm('\n确认发布?');
    if (!ok) {
      console.log('\n⏹️  已取消发布\n');
      process.exit(0);
    }

    // -------- 8. 构建 & 发布 --------
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📦 发布 ${pkgJson.name} → ${newVersion}`);
    console.log('='.repeat(50));

    // 备份源 package.json，用于失败时回滚
    const backupMap = new Map<string, string>();
    const backupPkg = (dir: string) => {
      const filePath = path.join(dir, 'package.json');
      if (fs.existsSync(filePath)) {
        backupMap.set(filePath, fs.readFileSync(filePath, 'utf-8'));
      }
    };

    try {
      backupPkg(pkgDir);

      // 先更新源 package.json 版本号（build 会复制到 dist）
      console.log('\n📝 更新版本号...');
      pkgJson.version = newVersion;
      writePkg(pkgDir, pkgJson);
      console.log(`  ${pkgJson.name}@${newVersion}`);

      // 生产构建（会从 SVG 生成压缩产物到 dist，并复制 package.json）
      console.log('\n🔨 生产构建...');
      run(`npm run ${pkgConfig.buildCmd}`);

      // 在 dist 目录发布
      const publishCmd = `npm publish --tag ${distTag}${isDryRun ? ' --dry-run' : ''}`;
      console.log(`\n🚀 发布${isDryRun ? ' (dry-run)' : ''}...`);
      run(publishCmd, distDir);

      console.log(`\n✅ ${pkgJson.name}@${newVersion} 发布${isDryRun ? '模拟' : ''}成功！`);
    } catch (publishErr) {
      console.error(`\n❌ 发布过程中出错，正在回滚 package.json...`);
      for (const [filePath, originalContent] of backupMap) {
        fs.writeFileSync(filePath, originalContent);
        console.log(`  ↩️  已回滚 ${path.relative(ROOT_DIR, filePath)}`);
      }
      throw publishErr;
    }

    // -------- 9. Git 分支 & commit & tag --------
    if (!isDryRun) {
      console.log('\n📌 创建 release 分支、提交版本号变更并打 Git Tag...\n');

      // 基于 develop 创建 release 分支
      const branchName = `release/@mp-svg-icons/${targetFramework}@${newVersion}`;
      run(`git checkout -b ${branchName}`);

      // 暂存 package.json 变更
      const pkgJsonPath = path.relative(ROOT_DIR, path.join(pkgDir, 'package.json'));
      run(`git add ${pkgJsonPath}`);

      // 构建 commit message
      run(`git commit -m "release: ${pkgJson.name}@${newVersion}"`);

      // 打 tag
      const tagName = `${pkgJson.name}@${newVersion}`;
      run(`git tag ${tagName}`);
      console.log(`  🏷️  ${tagName}`);

      // 推送 release 分支和 tag 到远程仓库
      console.log('\n📤 推送到远程仓库...\n');
      run(`git push -u origin ${branchName}`);
      run('git push --tags');
    }

    // -------- 10. 完成 --------
    console.log(`\n${'🎉'.repeat(3)} 发布完成！\n`);

    if (!isDryRun) {
      console.log(`  - ${pkgJson.name}@${newVersion} (tag: ${distTag})`);
      console.log(`  - Git Tag: ${pkgJson.name}@${newVersion}`);
      const branchName = `release/@mp-svg-icons/${targetFramework}@${newVersion}`;
      console.log(`  - Git 分支: ${branchName}`);
      console.log('');
    }
  } catch (err) {
    console.error('\n❌ 发布失败：', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();

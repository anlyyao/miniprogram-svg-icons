'use strict';

/**
 * Changelog 公共能力
 *
 * 约定：
 * 1. PR 描述中以 `#### @mp-svg-icons/<pkg>` 作为分包标题，标题下的列表项即为该包的变更条目；
 * 2. 生成的条目会以 `packages/<pkg>/.changelog/pr-<number>.md` 的形式暂存在对应子包目录下；
 * 3. 发布时从该子包目录读取暂存条目，聚合写入 `packages/<pkg>/CHANGELOG.md`，并作为 GitHub Release 的正文。
 */

const fs = require('node:fs');
const path = require('node:path');

const STASH_DIR = '.changelog';
const PACKAGES_DIR = 'packages';
/** 「无需 changelog」勾选项 */
const SKIP_PATTERN = /^\s*[-*]\s*\[[xX]\]\s*本条 PR 不需要纳入 Changelog/m;
const HTML_COMMENT_PATTERN = /<!--[\s\S]*?-->/g;
/** conventional commit 前缀：type(scope)!: rest */
const COMMIT_PATTERN = /^([a-zA-Z]+)(?:\(([^)]*)\))?(!)?:\s*([\s\S]*)$/;

const TYPE_ALIAS = {
  feat: 'feat',
  feature: 'feat',
  fix: 'fix',
  bugfix: 'fix',
  perf: 'perf',
  refactor: 'refactor',
  style: 'style',
  docs: 'docs',
  doc: 'docs',
  test: 'test',
  tests: 'test',
  chore: 'chore',
  build: 'chore',
  ci: 'chore',
  revert: 'other',
};

const SECTIONS = [
  ['breaking', '🚨 Breaking Changes'],
  ['feat', '🚀 Features'],
  ['fix', '🐞 Bug Fixes'],
  ['perf', '⚡ Performance'],
  ['refactor', '♻️ Refactor'],
  ['style', '💄 Styles'],
  ['docs', '📝 Docs'],
  ['test', '✅ Tests'],
  ['chore', '🔧 Chore'],
  ['other', '🔨 Others'],
];

const SECTION_TITLES = Object.fromEntries(SECTIONS);
const SECTION_ORDER = SECTIONS.map(([key]) => key);

function resolveRoot(root) {
  return root || process.env.CHANGELOG_ROOT || process.env.GITHUB_WORKSPACE || process.cwd();
}

/** 读取 packages 下的所有子包信息 */
function listPackages(root) {
  const base = path.join(resolveRoot(root), PACKAGES_DIR);
  if (!fs.existsSync(base)) return [];

  return fs
    .readdirSync(base)
    .filter((dir) => fs.existsSync(path.join(base, dir, 'package.json')))
    .map((dir) => {
      const manifest = JSON.parse(fs.readFileSync(path.join(base, dir, 'package.json'), 'utf8'));
      return {
        dir,
        name: manifest.name || `@mp-svg-icons/${dir}`,
        version: manifest.version || '0.0.0',
      };
    })
    .sort((a, b) => a.dir.localeCompare(b.dir));
}

/**
 * 解析 PR 描述，提取各分包的 changelog 条目
 * @returns {{ skipped: boolean, entries: Record<string, string[]> }}
 */
function parsePullRequestBody(body, packages) {
  const result = { skipped: false, entries: {} };
  if (!body) return result;

  const text = String(body).replace(/\r\n/g, '\n');
  if (SKIP_PATTERN.test(text)) {
    result.skipped = true;
    return result;
  }

  const alias = new Map();
  packages.forEach((pkg) => {
    alias.set(pkg.name.toLowerCase(), pkg.name);
    alias.set(pkg.dir.toLowerCase(), pkg.name);
  });

  let current = '';
  for (const raw of text.replace(HTML_COMMENT_PATTERN, '').split('\n')) {
    const line = raw.trim();

    const heading = /^#{1,6}\s+(.+)$/.exec(line);
    if (heading) {
      const title = heading[1].replace(/[`*]/g, '').trim().toLowerCase();
      current = alias.get(title) || '';
      continue;
    }

    if (!current || !line) continue;
    if (/^[-*]\s*\[[ xX]\]/.test(line)) continue; // 跳过任务勾选项

    const entry = line.replace(/^[-*+]\s+/, '').trim();
    if (!entry) continue;

    (result.entries[current] = result.entries[current] || []).push(entry);
  }

  return result;
}

/** 为条目补充作者与 PR 链接 */
function decorateEntry(entry, meta = {}) {
  let text = String(entry).trim();
  const { author, number, url } = meta;

  if (author && !new RegExp(`@${author}(\\s|$|\\))`, 'i').test(text)) {
    text += ` @${author}`;
  }
  if (number && !text.includes(`#${number}`)) {
    text += url ? ` ([#${number}](${url}))` : ` (#${number})`;
  }
  return text;
}

/** 根据 conventional commit 前缀归类 */
function classify(entry) {
  const matched = COMMIT_PATTERN.exec(entry.trim());
  // `!` 标记或正文含 BREAKING CHANGE 均视为破坏性变更
  if ((matched && matched[3]) || /^breaking[\s-]?change/i.test(entry) || /BREAKING[\s-]CHANGE/.test(entry)) {
    return 'breaking';
  }
  if (!matched) return 'other';
  return TYPE_ALIAS[matched[1].toLowerCase()] || 'other';
}

/** 去掉 `type(scope):` 前缀，scope 用行内代码高亮 */
function formatItem(entry) {
  const text = entry.trim();
  const matched = COMMIT_PATTERN.exec(text);
  if (!matched) return text;

  const [, type, scope, , rest] = matched;
  if (!TYPE_ALIAS[type.toLowerCase()] && !/^breaking/i.test(type)) return text;
  return scope ? `\`${scope}\`: ${rest}` : rest;
}

/**
 * 将条目按类型分组渲染
 * @param {string[]} entries
 * @param {(title: string) => string} titleFormatter
 */
function renderSections(entries, titleFormatter = (title) => `### ${title}`) {
  const groups = new Map();
  for (const entry of entries) {
    const key = classify(entry);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  }

  const blocks = [];
  for (const key of SECTION_ORDER) {
    const list = groups.get(key);
    if (!list || !list.length) continue;
    blocks.push([titleFormatter(SECTION_TITLES[key]), '', ...list.map((item) => `- ${formatItem(item)}`)].join('\n'));
  }
  return blocks.join('\n\n');
}

function stashDir(root, pkgDir) {
  return path.join(resolveRoot(root), PACKAGES_DIR, pkgDir, STASH_DIR);
}

function stashFile(root, pkgDir, prNumber) {
  return path.join(stashDir(root, pkgDir), `pr-${prNumber}.md`);
}

/** 写入（或在无条目时删除）某个包的 PR 暂存文件 */
function writeStash(root, pkgDir, prNumber, entries) {
  const file = stashFile(root, pkgDir, prNumber);
  const relative = path.relative(resolveRoot(root), file);

  if (!entries || !entries.length) {
    if (fs.existsSync(file)) {
      fs.rmSync(file);
      return { file: relative, removed: true };
    }
    return null;
  }

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${entries.map((entry) => `- ${entry}`).join('\n')}\n`, 'utf8');
  return { file: relative, removed: false };
}

/** 读取某个包已暂存的全部条目（按 PR 编号升序） */
function readStash(root, pkgDir) {
  const dir = stashDir(root, pkgDir);
  if (!fs.existsSync(dir)) return [];

  const prNumber = (file) => Number(/\d+/.exec(file)?.[0]) || 0;

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => prNumber(a) - prNumber(b))
    .flatMap((file) =>
      fs
        .readFileSync(path.join(dir, file), 'utf8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => /^[-*]\s+/.test(line))
        .map((line) => line.replace(/^[-*]\s+/, '')),
    );
}

/**
 * 清空某个包的暂存目录。
 * @returns {string[]} 被删除的暂存文件相对路径列表（相对仓库根），供调用方在 git 中删除
 */
function clearStash(root, pkgDir) {
  const dir = stashDir(root, pkgDir);
  if (!fs.existsSync(dir)) return [];
  const removed = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.relative(resolveRoot(root), path.join(dir, file)));
  fs.rmSync(dir, { recursive: true, force: true });
  return removed;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

const CHANGELOG_FRONTMATTER = ['---', 'title: 更新日志', 'docClass: timeline', '---'].join('\n');

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 从packages/<pkg>/CHANGELOG.md 中读取指定版本区块的正文（不含 `## 🌈 version` 标题行）。
 * 用于发版阶段：合成时已把版本写入 CHANGELOG.md，此处直接回读作为 GitHub Release 正文。
 * @returns {string|null} 找到返回正文，未找到返回 null
 */
function readVersionNotes(root, pkg, version) {
  const file = path.join(resolveRoot(root), PACKAGES_DIR, pkg.dir, 'CHANGELOG.md');
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const chunks = raw.split(/^(?=##\s)/m);
  const head = new RegExp(`^##\\s+🌈\\s+${escapeRegExp(version)}(\\s|\`|$)`, 'm');
  for (const chunk of chunks) {
    if (!head.test(chunk)) continue;
    // 去掉标题行，返回正文
    return chunk.replace(/^##\s.*\n*/, '').trimEnd();
  }
  return null;
}

/** 将某个版本的变更写入 packages/<pkg>/CHANGELOG.md。同名版本会覆盖而非重复追加。 */
function updateChangelogFile(root, pkg, version, notes) {
  const file = path.join(resolveRoot(root), PACKAGES_DIR, pkg.dir, 'CHANGELOG.md');
  const raw = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : '';

  // 剥离 frontmatter 与旧一级标题，得到历史版本正文
  const history = raw.replace(/^---\n[\s\S]*?\n---\n*/, '').replace(/^#\s.*\n*/, '').trimStart();
  const block = `## 🌈 ${version} \`${today()}\``;

  // 剔除历史中已存在的同名版本区块（重复发版保护）以及 Unreleased 区块（发版后已归入版本）
  const sameVersion = new RegExp(`^##\\s+🌈\\s+${escapeRegExp(version)}\\s`, 'm');
  const rest = history
    .split(/^(?=##\s)/m)
    .map((chunk) => chunk.replace(/^\n+/, ''))
    .filter((chunk) => chunk && !sameVersion.test(chunk) && !/^##\s+🌈\s+Unreleased\s/m.test(chunk))
    .join('\n');

  const next = `${CHANGELOG_FRONTMATTER}\n\n${block}\n\n${notes}\n\n${rest}`.replace(/\n{3,}/g, '\n\n').trimEnd();

  fs.writeFileSync(file, `${next}\n`, 'utf8');
  return path.relative(resolveRoot(root), file);
}

/**
 * 基于 PR 条目重新生成 `## 🌈 Unreleased` 区块。
 * @deprecated 现已改为写入 `.changelog/pr-<number>.md` 暂存文件（见 writeStash），此函数仅保留兼容。
 * @param {string} pkgDir 子包目录
 * @param {string[]} entries 已装饰好的条目
 */
function updateUnreleased(root, pkgDir, entries = []) {
  const file = path.join(resolveRoot(root), PACKAGES_DIR, pkgDir, 'CHANGELOG.md');
  let existing = [];

  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const history = raw.replace(/^---\n[\s\S]*?\n---\n*/, '').replace(/^#\s.*\n*/, '').trimStart();
    // 提取已有的 Unreleased 区块条目
    const match = /^##\s+🌈\s+Unreleased\s*\n([\s\S]*?)(?=^##\s|\Z)/m.exec(history);
    if (match) {
      existing = match[1]
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => /^[-*]\s+/.test(line))
        .map((line) => line.replace(/^[-*]\s+/, ''));
    }
  }

  // 合并：按 PR 编号去重，保留历史条目并追加本次新增
  const byPr = new Map();
  for (const entry of [...existing, ...entries]) {
    const ref = /#(\d+)/.exec(entry);
    byPr.set(ref ? Number(ref[1]) : entry, entry);
  }
  const merged = [...byPr.values()];

  const raw = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : '';
  const history = raw.replace(/^---\n[\s\S]*?\n---\n*/, '').replace(/^#\s.*\n*/, '').trimStart();

  // 剔除已有的 Unreleased 区块（其余按原顺序保留）
  const rest = history
    .split(/^(?=##\s)/m)
    .map((chunk) => chunk.replace(/^\n+/, ''))
    .filter((chunk) => chunk && !/^##\s+🌈\s+Unreleased\s/m.test(chunk))
    .join('\n');

  const block = merged.length ? `## 🌈 Unreleased\n\n${renderSections(merged)}` : '';

  const next = [CHANGELOG_FRONTMATTER, '', block, rest].filter(Boolean).join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();

  fs.writeFileSync(file, `${next}\n`, 'utf8');
  return path.relative(resolveRoot(root), file);
}

module.exports = {
  PACKAGES_DIR,
  STASH_DIR,
  clearStash,
  decorateEntry,
  formatItem,
  listPackages,
  parsePullRequestBody,
  readStash,
  readVersionNotes,
  renderSections,
  resolveRoot,
  today,
  updateChangelogFile,
  updateUnreleased,
  writeStash,
};

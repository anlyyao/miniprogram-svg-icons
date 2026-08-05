'use strict';

/**
 * Release Changelog 聚合器
 *
 * - renderPreview：release/* PR 中预览待发布的 changelog
 * - applyRelease：合并后把暂存条目写入 packages/<pkg>/CHANGELOG.md，并返回 GitHub Release 正文
 * - createReleases：按包创建（或更新）GitHub Release
 */

const core0 = require('./changelog-core.cjs');

/** `@mp-svg-icons/wechat@0.0.3` -> { name, version, dir } */
function parseTag(tag) {
  const index = tag.lastIndexOf('@');
  const name = tag.slice(0, index);
  return { tag, name, version: tag.slice(index + 1), dir: name.split('/').pop() };
}

/** 收集待发布包的暂存条目 */
function collect({ root, dirs } = {}) {
  const packages = core0.listPackages(root);
  const scope = dirs && dirs.length ? packages.filter((pkg) => dirs.includes(pkg.dir)) : packages;

  return scope.map((pkg) => ({ ...pkg, entries: core0.readStash(root, pkg.dir) })).filter((pkg) => pkg.entries.length);
}

/**
 * 从一批 PR 中聚合各子包的 changelog 条目
 * @returns {Array<{dir:string,name:string,version:string,entries:string[]}>}
 */
function aggregate({ root, prs = [] } = {}) {
  const packages = core0.listPackages(root);
  const result = packages.map((pkg) => ({ ...pkg, entries: [] }));

  for (const pr of prs) {
    if (!pr || !pr.body) continue;
    const parsed = core0.parsePullRequestBody(pr.body, packages);
    if (parsed.skipped) continue;
    const meta = { author: pr.user?.login, number: pr.number, url: pr.html_url };
    for (const pkg of result) {
      const entries = parsed.entries[pkg.name];
      if (!entries || !entries.length) continue;
      for (const entry of entries) pkg.entries.push(core0.decorateEntry(entry, meta));
    }
  }
  return result.filter((pkg) => pkg.entries.length);
}

/** release PR 的 changelog 预览片段（优先用传入的 PR 列表聚合，否则回退到暂存文件） */
function renderPreview({ root, dirs, prs } = {}) {
  const collected = prs ? aggregate({ root, prs }) : collect({ root, dirs });
  const scope = dirs && dirs.length ? collected.filter((pkg) => dirs.includes(pkg.dir)) : collected;
  if (!scope.length) return '';

  const date = core0.today();
  const lines = ['### 📝 Changelog Preview', ''];
  for (const pkg of scope) {
    lines.push(
      `# 🎉 发布 ${pkg.name}`,
      `## 🌈 ${pkg.version} \`${date}\``,
      '',
      core0.renderSections(pkg.entries),
      '',
    );
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n');
}

/**
 * 合并后生成 GitHub Release 正文。
 * changelog 已在 release PR 的「合成」阶段写入 CHANGELOG.md 且暂存文件已清理，
 * 因此此处直接从 CHANGELOG.md 回读对应版本区块作为 Release 正文，不再读取/清理暂存。
 * @param {{ root?: string, published: string[] }} options published 形如 `@mp-svg-icons/wechat@0.0.3`
 */
function applyRelease({ root, published = [] } = {}) {
  const packages = core0.listPackages(root);
  const releases = [];

  for (const tag of published) {
    const info = parseTag(tag);
    const pkg = packages.find((item) => item.name === info.name || item.dir === info.dir);
    if (!pkg) continue;

    // 优先从已合成的 CHANGELOG.md 回读；兜底：仍有残留暂存则据其渲染
    let notes = core0.readVersionNotes(root, pkg, info.version);
    if (!notes) {
      const entries = core0.readStash(root, pkg.dir);
      notes = entries.length
        ? core0.renderSections(entries)
        : '### 🔧 Chore\n\n- 无用户可感知的变更（版本对齐或依赖更新）';
      // 兜底路径下，若确实写入了内容也一并落库并清理，保持一致性
      core0.updateChangelogFile(root, pkg, info.version, notes);
      core0.clearStash(root, pkg.dir);
    }

    releases.push({
      tag: info.tag,
      name: pkg.name,
      dir: pkg.dir,
      version: info.version,
      notes,
      file: `${core0.PACKAGES_DIR}/${pkg.dir}/CHANGELOG.md`,
      prerelease: info.version.includes('-'),
    });
  }

  return releases;
}

/** 创建或更新 GitHub Release */
async function createReleases({ github, context, core, releases = [], prNumber }) {
  const { owner, repo } = context.repo;
  const created = [];

  for (const item of releases) {
    const body = [
      item.notes,
      '',
      prNumber ? `> 发布自 #${prNumber}` : '',
      `> npm: https://www.npmjs.com/package/${item.name}/v/${item.version}`,
    ]
      .filter(Boolean)
      .join('\n');

    const payload = {
      owner,
      repo,
      tag_name: item.tag,
      name: item.tag,
      body,
      prerelease: item.prerelease,
      make_latest: item.prerelease ? 'false' : 'true',
    };

    try {
      const { data } = await github.rest.repos.createRelease(payload);
      created.push(data.html_url);
      core.info(`✅ 已创建 Release：${item.tag}`);
    } catch (error) {
      // 422 表示同名 tag 的 Release 已存在，改为更新
      if (error.status !== 422) {
        core.warning(`⚠️ 创建 Release 失败：${item.tag} - ${error.message}`);
        continue;
      }
      try {
        const { data: existed } = await github.rest.repos.getReleaseByTag({ owner, repo, tag: item.tag });
        const { data } = await github.rest.repos.updateRelease({ ...payload, release_id: existed.id });
        created.push(data.html_url);
        core.info(`♻️ 已更新 Release：${item.tag}`);
      } catch (innerError) {
        core.warning(`⚠️ 更新 Release 失败：${item.tag} - ${innerError.message}`);
      }
    }
  }

  return created;
}

/** 把一批 PR 的 changelog 条目写入各子包暂存文件（供 applyRelease 读取） */
function writeStashFromPRs({ root, prs = [] } = {}) {
  const packages = core0.listPackages(root);
  const written = [];
  for (const pr of prs) {
    if (!pr || !pr.body) continue;
    const parsed = core0.parsePullRequestBody(pr.body, packages);
    if (parsed.skipped) continue;
    const meta = { author: pr.user?.login, number: pr.number, url: pr.html_url };
    for (const pkg of packages) {
      const entries = (parsed.entries[pkg.name] || []).map((entry) => core0.decorateEntry(entry, meta));
      if (!entries.length) continue;
      const res = core0.writeStash(root, pkg.dir, pr.number, entries);
      if (res && !res.removed) written.push(res.file);
    }
  }
  return written;
}

/**
 * 收集本次发版区间内（上一个 tag 到当前 HEAD）已合并 PR 的列表
 * @returns {Promise<Array<object>>}
 */
async function collectPRs({ github, context } = {}) {
  const { execSync } = require('child_process');
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  let base;
  try {
    base = execSync('git describe --tags --abbrev=0').toString().trim();
  } catch (err) {
    base = execSync('git rev-list --max-parents=0 HEAD').toString().trim().split('\n')[0];
  }
  const shas = execSync(`git rev-list ${base}..HEAD --no-merges`).toString().trim().split('\n').filter(Boolean);

  const prs = [];
  const seen = new Set();
  for (const sha of shas) {
    try {
      const { data } = await github.rest.repos.listPullRequestsAssociatedWithCommit({ owner, repo, commit_sha: sha });
      for (const pr of data) {
        if (seen.has(pr.number)) continue;
        seen.add(pr.number);
        prs.push(pr);
      }
    } catch (err) {
      // 某些 commit（如直接 push）可能没有关联 PR，忽略即可
    }
  }
  return prs;
}

/**
 * release PR 的「合成」阶段：
 * 读取各子包 .changelog/pr-*.md 暂存 → 合成版本区块写入 CHANGELOG.md → 清理该子包 .changelog 暂存。
 * @returns {{ affected: string[], removed: string[] }}
 *   affected: 写入了 CHANGELOG.md 的子包目录；removed: 被清理的暂存文件相对路径（供 commit 删除）
 */
function composeReleaseChangelog({ root, dirs, prs } = {}) {
  const collected = prs ? aggregate({ root, prs }) : collect({ root, dirs });
  const scope = dirs && dirs.length ? collected.filter((pkg) => dirs.includes(pkg.dir)) : collected;
  const affected = [];
  const removed = [];
  for (const pkg of scope) {
    if (!pkg.entries.length) continue;
    const notes = core0.renderSections(pkg.entries);
    core0.updateChangelogFile(root, pkg, pkg.version, notes);
    affected.push(pkg.dir);
    // 已合成进 CHANGELOG.md，清理该子包暂存，并记录被删除文件用于提交
    removed.push(...core0.clearStash(root, pkg.dir));
  }
  return { affected, removed };
}

module.exports = {
  aggregate,
  applyRelease,
  collect,
  collectPRs,
  composeReleaseChangelog,
  createReleases,
  renderPreview,
  writeStashFromPRs,
};

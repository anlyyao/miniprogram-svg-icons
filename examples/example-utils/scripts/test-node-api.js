/**
 * Node.js API 测试脚本 — 测试 @mp-svg-icons/utils 的编程接口
 *
 * 测试覆盖：
 *   1. clear()  — SVG 图标裁剪（扫描模式、手动指定模式、混合模式、dry-run 模式）
 *   2. iconfontClear() — iconfont 图标裁剪（tdesign + vant 两种组件库）
 *   3. 错误处理 — 参数校验、路径不存在等异常场景
 *
 * 使用方法：
 *   cd examples/example-utils
 *   node scripts/test-node-api.js
 */

const path = require('path');
const fs = require('fs');

// 引用编译后的 utils 包
const { clear, iconfontClear } = require('../../../dist/utils/index');

// ======================== 工具函数 ========================

const DIVIDER = '='.repeat(60);
const SUB_DIVIDER = '-'.repeat(40);

let passCount = 0;
let failCount = 0;

function logSection(title) {
  console.log(`\n${DIVIDER}`);
  console.log(`  ${title}`);
  console.log(DIVIDER);
}

function logSubSection(title) {
  console.log(`\n${SUB_DIVIDER}`);
  console.log(`  ${title}`);
  console.log(SUB_DIVIDER);
}

function assert(condition, message) {
  if (condition) {
    passCount++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failCount++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

function assertThrows(fn, expectedMsg, description) {
  try {
    fn();
    failCount++;
    console.error(`  ❌ FAIL: ${description} — 应该抛出错误但未抛出`);
  } catch (err) {
    if (expectedMsg && !err.message.includes(expectedMsg)) {
      failCount++;
      console.error(`  ❌ FAIL: ${description} — 错误信息不匹配`);
      console.error(`    期望包含: "${expectedMsg}"`);
      console.error(`    实际信息: "${err.message}"`);
    } else {
      passCount++;
      console.log(`  ✅ PASS: ${description}`);
      console.log(`         抛出: "${err.message.substring(0, 60)}${err.message.length > 60 ? '...' : ''}"`);
    }
  }
}

/**
 * 备份文件内容（用于测试后恢复）
 */
function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return null;
}

/**
 * 恢复文件内容
 */
function restoreFile(filePath, content) {
  if (content !== null) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

// ======================== 路径定义 ========================

const ROOT_DIR = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');
const SVG_PKG_DIR = path.join(ROOT_DIR, 'miniprogram_npm/@mp-svg-icons/wechat');
const TDESIGN_PKG_DIR = path.join(ROOT_DIR, 'miniprogram_npm/tdesign-miniprogram');
const VANT_PKG_DIR = path.join(ROOT_DIR, 'miniprogram_npm/@vant/weapp');
const ICONS_JS_PATH = path.join(SVG_PKG_DIR, 'icon/icons.js');
const TDESIGN_CSS_PATH = path.join(TDESIGN_PKG_DIR, 'icon/icon.wxss');
const VANT_CSS_PATH = path.join(VANT_PKG_DIR, 'icon/index.wxss');

// ======================== 测试开始 ========================

console.log('\n🧪 @mp-svg-icons/utils — Node.js API 完整测试\n');
console.log(`📁 项目根目录: ${ROOT_DIR}`);
console.log(`📁 SVG 图标包: ${SVG_PKG_DIR}`);
console.log(`📁 TDesign 包: ${TDESIGN_PKG_DIR}`);
console.log(`📁 Vant 包:    ${VANT_PKG_DIR}`);

// ================================================================
// 测试 1: clear() — SVG 图标裁剪 (dry-run 扫描模式)
// ================================================================
logSection('测试 1: clear() — dry-run 扫描模式');

logSubSection('1.1 扫描所有页面目录 (dry-run)');
{
  const result = clear({
    scanDirs: [PAGES_DIR],
    icons: [],
    pkgDir: SVG_PKG_DIR,
    dryRun: true,
  });

  assert(result != null, '返回结果不为空');
  assert(Array.isArray(result.brands), 'result.brands 是数组');
  assert(result.brands.length === 2, `发现 2 个品牌 (实际: ${result.brands.length})`);
  assert(typeof result.totalSavedBytes === 'number', 'totalSavedBytes 是数字');

  // 检查 tdesign 品牌结果
  const tdesignResult = result.brands.find((b) => b.brand === 'tdesign');
  assert(tdesignResult != null, 'tdesign 品牌存在');
  if (tdesignResult) {
    assert(tdesignResult.totalCount === 10, `tdesign 总图标数为 10 (实际: ${tdesignResult.totalCount})`);
    assert(tdesignResult.usedIcons.length > 0, `tdesign 有使用中的图标 (${tdesignResult.usedIcons.length} 个)`);
    assert(tdesignResult.removedIcons.length > 0, `tdesign 有可移除的图标 (${tdesignResult.removedIcons.length} 个)`);
    console.log(`    保留: [${tdesignResult.usedIcons.join(', ')}]`);
    console.log(`    移除: [${tdesignResult.removedIcons.join(', ')}]`);
  }

  // 检查 material 品牌结果
  const materialResult = result.brands.find((b) => b.brand === 'material');
  assert(materialResult != null, 'material 品牌存在');
  if (materialResult) {
    assert(materialResult.totalCount === 5, `material 总图标数为 5 (实际: ${materialResult.totalCount})`);
    assert(materialResult.usedIcons.length > 0, `material 有使用中的图标 (${materialResult.usedIcons.length} 个)`);
    console.log(`    保留: [${materialResult.usedIcons.join(', ')}]`);
    console.log(`    移除: [${materialResult.removedIcons.join(', ')}]`);
  }

  // 验证 dry-run 模式不修改文件
  const iconsContent = fs.readFileSync(ICONS_JS_PATH, 'utf-8');
  assert(iconsContent.includes('"setting"'), 'dry-run 模式下文件未被修改（setting 图标仍存在）');
}

// ================================================================
// 测试 2: clear() — 手动指定图标模式 (dry-run)
// ================================================================
logSection('测试 2: clear() — 手动指定图标模式 (dry-run)');

logSubSection('2.1 仅手动指定保留图标');
{
  const result = clear({
    scanDirs: [],
    icons: ['add', 'close', 'home'],
    pkgDir: SVG_PKG_DIR,
    dryRun: true,
  });

  const tdesignResult = result.brands.find((b) => b.brand === 'tdesign');
  assert(tdesignResult != null, 'tdesign 品牌存在');
  if (tdesignResult) {
    assert(tdesignResult.usedIcons.includes('add'), '手动指定的 add 被保留');
    assert(tdesignResult.usedIcons.includes('close'), '手动指定的 close 被保留');
    assert(tdesignResult.usedIcons.includes('home'), '手动指定的 home 被保留');
    assert(tdesignResult.usedIcons.length === 3, `tdesign 保留 3 个图标 (实际: ${tdesignResult.usedIcons.length})`);
    assert(
      tdesignResult.removedIcons.length === 7,
      `tdesign 移除 7 个图标 (实际: ${tdesignResult.removedIcons.length})`,
    );
  }

  const materialResult = result.brands.find((b) => b.brand === 'material');
  if (materialResult) {
    assert(materialResult.usedIcons.includes('add'), 'material 品牌中 add 也被保留');
    assert(materialResult.usedIcons.includes('close'), 'material 品牌中 close 也被保留');
    assert(materialResult.usedIcons.includes('home'), 'material 品牌中 home 也被保留');
  }
}

logSubSection('2.2 指定不存在的图标名');
{
  const result = clear({
    scanDirs: [],
    icons: ['add', 'nonexistent-icon-xyz'],
    pkgDir: SVG_PKG_DIR,
    dryRun: true,
  });

  const tdesignResult = result.brands.find((b) => b.brand === 'tdesign');
  if (tdesignResult) {
    assert(tdesignResult.usedIcons.includes('add'), '有效图标 add 被保留');
    assert(!tdesignResult.usedIcons.includes('nonexistent-icon-xyz'), '无效图标被忽略');
  }
}

// ================================================================
// 测试 3: clear() — 混合模式 (扫描 + 手动指定) (dry-run)
// ================================================================
logSection('测试 3: clear() — 混合模式 (dry-run)');

logSubSection('3.1 扫描 + 手动指定动态图标');
{
  const result = clear({
    scanDirs: [PAGES_DIR],
    icons: ['setting', 'loading'], // 手动补充动态图标
    pkgDir: SVG_PKG_DIR,
    dryRun: true,
  });

  const tdesignResult = result.brands.find((b) => b.brand === 'tdesign');
  if (tdesignResult) {
    // 扫描到的 + 手动指定的都应该被保留
    assert(tdesignResult.usedIcons.includes('setting'), '手动指定的 setting 被保留');
    assert(tdesignResult.usedIcons.includes('loading'), '手动指定的 loading 被保留');
    assert(tdesignResult.usedIcons.includes('add'), '扫描到的 add 被保留');
    assert(tdesignResult.usedIcons.includes('close'), '扫描到的 close 被保留');
    console.log(`    混合模式保留: [${tdesignResult.usedIcons.join(', ')}]`);
  }
}

// ================================================================
// 测试 4: clear() — 实际裁剪并恢复
// ================================================================
logSection('测试 4: clear() — 实际裁剪（非 dry-run）');

logSubSection('4.1 实际执行裁剪后恢复');
{
  // 备份原始文件
  const originalContent = backupFile(ICONS_JS_PATH);

  const result = clear({
    scanDirs: [],
    icons: ['add', 'close'],
    pkgDir: SVG_PKG_DIR,
    dryRun: false, // 实际执行
  });

  // 验证文件被修改
  const modifiedContent = fs.readFileSync(ICONS_JS_PATH, 'utf-8');
  assert(modifiedContent.includes('"add"'), '裁剪后 add 图标仍存在');
  assert(modifiedContent.includes('"close"'), '裁剪后 close 图标仍存在');
  assert(!modifiedContent.includes('"search"'), '裁剪后 search 图标已移除');
  assert(!modifiedContent.includes('"setting"'), '裁剪后 setting 图标已移除');
  assert(result.totalSavedBytes > 0, `实际节省 ${result.totalSavedBytes} 字节`);

  // 恢复文件
  restoreFile(ICONS_JS_PATH, originalContent);
  const restoredContent = fs.readFileSync(ICONS_JS_PATH, 'utf-8');
  assert(restoredContent.includes('"setting"'), '文件已恢复（setting 图标已恢复）');
}

// ================================================================
// 测试 5: clear() — 只扫描部分目录
// ================================================================
logSection('测试 5: clear() — 部分目录扫描 (dry-run)');

logSubSection('5.1 仅扫描 pages/index 目录');
{
  const result = clear({
    scanDirs: [path.join(PAGES_DIR, 'index')],
    icons: [],
    pkgDir: SVG_PKG_DIR,
    dryRun: true,
  });

  const tdesignResult = result.brands.find((b) => b.brand === 'tdesign');
  if (tdesignResult) {
    // pages/index/index.wxml 中使用了 add, close, search
    assert(tdesignResult.usedIcons.includes('add'), '扫描到 add');
    assert(tdesignResult.usedIcons.includes('close'), '扫描到 close');
    assert(tdesignResult.usedIcons.includes('search'), '扫描到 search');
    // 不应扫描到其他页面的图标
    assert(!tdesignResult.usedIcons.includes('arrow-left'), '未扫描到其他页面的 arrow-left');
    console.log(`    仅 index 页面保留: [${tdesignResult.usedIcons.join(', ')}]`);
  }
}

logSubSection('5.2 仅扫描 pages/multi-brand 目录');
{
  const result = clear({
    scanDirs: [path.join(PAGES_DIR, 'multi-brand')],
    icons: [],
    pkgDir: SVG_PKG_DIR,
    dryRun: true,
  });

  const tdesignResult = result.brands.find((b) => b.brand === 'tdesign');
  if (tdesignResult) {
    // pages/multi-brand/index.wxml 中使用了 arrow-left, arrow-right, loading (tdesign)
    assert(tdesignResult.usedIcons.includes('arrow-left'), '扫描到 arrow-left');
    assert(tdesignResult.usedIcons.includes('arrow-right'), '扫描到 arrow-right');
    assert(tdesignResult.usedIcons.includes('loading'), '扫描到 loading');
    console.log(`    multi-brand 页面 tdesign 保留: [${tdesignResult.usedIcons.join(', ')}]`);
  }

  const materialResult = result.brands.find((b) => b.brand === 'material');
  if (materialResult) {
    // pages/multi-brand/index.wxml 中使用了 add, close (material)
    assert(materialResult.usedIcons.includes('add'), 'material: 扫描到 add');
    assert(materialResult.usedIcons.includes('close'), 'material: 扫描到 close');
    console.log(`    multi-brand 页面 material 保留: [${materialResult.usedIcons.join(', ')}]`);
  }
}

// ================================================================
// 测试 6: iconfontClear() — TDesign iconfont 裁剪 (dry-run)
// ================================================================
logSection('测试 6: iconfontClear() — TDesign iconfont (dry-run)');

logSubSection('6.1 扫描所有页面（dry-run）');
{
  const result = iconfontClear({
    scanDirs: [PAGES_DIR],
    icons: [],
    pkgDir: TDESIGN_PKG_DIR,
    dryRun: true,
  });

  assert(result != null, '返回结果不为空');
  assert(result.pkgDir === TDESIGN_PKG_DIR, 'pkgDir 正确');
  assert(result.cssPrefix === 't-icon', `CSS 前缀为 t-icon (实际: ${result.cssPrefix})`);
  assert(result.totalCount > 0, `共有 ${result.totalCount} 个图标规则`);
  assert(result.usedIcons.length > 0, `使用中的图标: ${result.usedIcons.length} 个`);
  assert(result.removedIcons.length > 0, `可移除的图标: ${result.removedIcons.length} 个`);
  assert(typeof result.savedBytes === 'number', 'savedBytes 是数字');

  console.log(`    保留 (${result.usedIcons.length}): [${result.usedIcons.join(', ')}]`);
  console.log(`    移除 (${result.removedIcons.length}): [前5个: ${result.removedIcons.slice(0, 5).join(', ')}...]`);
}

logSubSection('6.2 手动指定图标（dry-run）');
{
  const result = iconfontClear({
    scanDirs: [],
    icons: ['home', 'search', 'add', 'close', 'loading'],
    pkgDir: TDESIGN_PKG_DIR,
    dryRun: true,
  });

  assert(result.usedIcons.includes('home'), '手动指定的 home 被保留');
  assert(result.usedIcons.includes('search'), '手动指定的 search 被保留');
  assert(result.usedIcons.includes('add'), '手动指定的 add 被保留');
  assert(result.usedIcons.length === 5, `保留 5 个图标 (实际: ${result.usedIcons.length})`);
}

// ================================================================
// 测试 7: iconfontClear() — Vant iconfont 裁剪 (dry-run)
// ================================================================
logSection('测试 7: iconfontClear() — Vant iconfont (dry-run)');

logSubSection('7.1 扫描所有页面（dry-run）');
{
  const result = iconfontClear({
    scanDirs: [PAGES_DIR],
    icons: [],
    pkgDir: VANT_PKG_DIR,
    dryRun: true,
  });

  assert(result != null, '返回结果不为空');
  assert(result.cssPrefix === 'van-icon', `CSS 前缀为 van-icon (实际: ${result.cssPrefix})`);
  assert(result.totalCount > 0, `共有 ${result.totalCount} 个图标规则`);
  assert(result.usedIcons.length > 0, `使用中的图标: ${result.usedIcons.length} 个`);
  assert(result.removedIcons.length > 0, `可移除的图标: ${result.removedIcons.length} 个`);

  console.log(`    保留 (${result.usedIcons.length}): [${result.usedIcons.join(', ')}]`);
  console.log(`    移除 (${result.removedIcons.length}): [前5个: ${result.removedIcons.slice(0, 5).join(', ')}...]`);
}

logSubSection('7.2 混合模式（扫描 + 手动指定）（dry-run）');
{
  const result = iconfontClear({
    scanDirs: [PAGES_DIR],
    icons: ['wechat', 'alipay', 'qq'],
    pkgDir: VANT_PKG_DIR,
    dryRun: true,
  });

  // 扫描到的 + 手动指定的
  assert(result.usedIcons.includes('close'), '扫描到的 close 被保留');
  assert(result.usedIcons.includes('search'), '扫描到的 search 被保留');
  assert(result.usedIcons.includes('wechat'), '手动指定的 wechat 被保留');
  assert(result.usedIcons.includes('alipay'), '手动指定的 alipay 被保留');
  assert(result.usedIcons.includes('qq'), '手动指定的 qq 被保留');
  console.log(`    混合模式保留 (${result.usedIcons.length}): [${result.usedIcons.join(', ')}]`);
}

// ================================================================
// 测试 8: iconfontClear() — 实际裁剪并恢复
// ================================================================
logSection('测试 8: iconfontClear() — 实际裁剪（非 dry-run）');

logSubSection('8.1 TDesign 实际裁剪后恢复');
{
  const originalContent = backupFile(TDESIGN_CSS_PATH);

  const result = iconfontClear({
    scanDirs: [],
    icons: ['home', 'close'],
    pkgDir: TDESIGN_PKG_DIR,
    dryRun: false,
  });

  const modifiedContent = fs.readFileSync(TDESIGN_CSS_PATH, 'utf-8');
  assert(modifiedContent.includes('.t-icon-home:before'), '裁剪后 home 规则仍存在');
  assert(modifiedContent.includes('.t-icon-close:before'), '裁剪后 close 规则仍存在');
  assert(!modifiedContent.includes('.t-icon-search:before'), '裁剪后 search 规则已移除');
  assert(result.savedBytes > 0, `实际节省 ${result.savedBytes} 字节`);

  // 恢复
  restoreFile(TDESIGN_CSS_PATH, originalContent);
  const restoredContent = fs.readFileSync(TDESIGN_CSS_PATH, 'utf-8');
  assert(restoredContent.includes('.t-icon-search:before'), 'CSS 文件已恢复');
}

logSubSection('8.2 Vant 实际裁剪后恢复');
{
  const originalContent = backupFile(VANT_CSS_PATH);

  const result = iconfontClear({
    scanDirs: [],
    icons: ['close', 'search'],
    pkgDir: VANT_PKG_DIR,
    dryRun: false,
  });

  const modifiedContent = fs.readFileSync(VANT_CSS_PATH, 'utf-8');
  assert(modifiedContent.includes('.van-icon-close:before'), '裁剪后 close 规则仍存在');
  assert(modifiedContent.includes('.van-icon-search:before'), '裁剪后 search 规则仍存在');
  assert(!modifiedContent.includes('.van-icon-home-o:before'), '裁剪后 home-o 规则已移除');
  assert(result.savedBytes > 0, `实际节省 ${result.savedBytes} 字节`);

  // 恢复
  restoreFile(VANT_CSS_PATH, originalContent);
  const restoredContent = fs.readFileSync(VANT_CSS_PATH, 'utf-8');
  assert(restoredContent.includes('.van-icon-home-o:before'), 'CSS 文件已恢复');
}

// ================================================================
// 测试 9: 错误处理
// ================================================================
logSection('测试 9: 错误处理');

logSubSection('9.1 clear() 参数校验');
{
  assertThrows(
    () => clear({ scanDirs: [], icons: [], pkgDir: '', dryRun: true }),
    '--pkg-dir 为必填参数',
    'pkgDir 为空字符串时抛出错误',
  );

  assertThrows(
    () => clear({ scanDirs: [], icons: [], pkgDir: '/nonexistent/path/to/pkg', dryRun: true }),
    '',
    'pkgDir 不存在时抛出错误',
  );
}

logSubSection('9.2 iconfontClear() 参数校验');
{
  assertThrows(
    () => iconfontClear({ scanDirs: [], icons: [], pkgDir: '', dryRun: true }),
    '--pkg-dir 为必填参数',
    'pkgDir 为空字符串时抛出错误',
  );

  assertThrows(
    () => iconfontClear({ scanDirs: [], icons: [], pkgDir: '/nonexistent/path/to/pkg', dryRun: true }),
    '',
    'pkgDir 不存在时抛出错误',
  );
}

// ================================================================
// 测试 10: 所有图标都在使用中的场景
// ================================================================
logSection('测试 10: 边界场景');

logSubSection('10.1 clear() — 所有图标都被保留');
{
  // 手动指定所有品牌的全部图标（tdesign 10个 + material 5个，取并集后 11个不重复）
  const result = clear({
    scanDirs: [],
    icons: [
      'add',
      'close',
      'check-circle',
      'search',
      'home',
      'loading',
      'arrow-left',
      'arrow-right',
      'delete',
      'setting',
      'star',
    ],
    pkgDir: SVG_PKG_DIR,
    dryRun: true,
  });

  const tdesignResult = result.brands.find((b) => b.brand === 'tdesign');
  if (tdesignResult) {
    assert(tdesignResult.removedIcons.length === 0, 'tdesign 所有图标都被使用时不裁剪');
    assert(
      tdesignResult.usedIcons.length === 10,
      `tdesign 保留全部 10 个图标 (实际: ${tdesignResult.usedIcons.length})`,
    );
  }

  const materialResult = result.brands.find((b) => b.brand === 'material');
  if (materialResult) {
    assert(materialResult.removedIcons.length === 0, 'material 所有图标都被使用时不裁剪');
    assert(
      materialResult.usedIcons.length === 5,
      `material 保留全部 5 个图标 (实际: ${materialResult.usedIcons.length})`,
    );
  }

  assert(result.totalSavedBytes === 0, '所有图标保留时没有节省字节数');
}

logSubSection('10.2 iconfontClear() — 只保留一个图标');
{
  const result = iconfontClear({
    scanDirs: [],
    icons: ['home'],
    pkgDir: TDESIGN_PKG_DIR,
    dryRun: true,
  });

  assert(result.usedIcons.length === 1, '只保留 1 个图标');
  assert(result.usedIcons[0] === 'home', '保留的图标是 home');
  assert(result.removedIcons.length === result.totalCount - 1, `移除了 ${result.removedIcons.length} 个图标`);
  assert(result.savedBytes > 0, `预计节省 ${result.savedBytes} 字节`);
}

// ======================== 测试结果汇总 ========================

logSection('📊 测试结果汇总');
console.log(`  总计: ${passCount + failCount} 个断言`);
console.log(`  通过: ${passCount} ✅`);
console.log(`  失败: ${failCount} ❌`);
console.log(`  通过率: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%`);

if (failCount > 0) {
  console.log('\n⚠️ 存在失败的测试，请检查上方输出！');
  process.exit(1);
} else {
  console.log('\n🎉 所有测试通过！');
}

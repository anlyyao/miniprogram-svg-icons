#!/bin/bash
# ================================================================
# CLI 测试脚本 — 测试 mp-svg-icons-clear 和 mp-iconfont-clear 命令行工具
#
# 测试覆盖：
#   1. mp-svg-icons-clear — SVG 图标裁剪 CLI
#      - 帮助信息
#      - dry-run 扫描模式
#      - 手动指定图标模式
#      - 混合模式（扫描 + 手动指定）
#      - 实际裁剪（含恢复）
#      - 参数校验与错误处理
#   2. mp-iconfont-clear — iconfont 图标裁剪 CLI
#      - 帮助信息
#      - dry-run 扫描模式（TDesign + Vant）
#      - 手动指定图标模式
#      - 实际裁剪（含恢复）
#      - 参数校验与错误处理
#
# 使用方法：
#   cd examples/example-utils
#   bash scripts/test-cli.sh
# ================================================================

set -e

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 计数器
PASS=0
FAIL=0

# CLI 路径
CLEAR_CLI="../../dist/utils/clear/cli.js"
ICONFONT_CLI="../../dist/utils/iconfont-clear/cli.js"

# 包路径
SVG_PKG_DIR="./miniprogram_npm/@mp-svg-icons/wechat"
TDESIGN_PKG_DIR="./miniprogram_npm/tdesign-miniprogram"
VANT_PKG_DIR="./miniprogram_npm/@vant/weapp"

# 关键文件路径
ICONS_JS="./miniprogram_npm/@mp-svg-icons/wechat/icon/icons.js"
TDESIGN_CSS="./miniprogram_npm/tdesign-miniprogram/icon/icon.wxss"
VANT_CSS="./miniprogram_npm/@vant/weapp/icon/index.wxss"

# ======================== 工具函数 ========================

divider() {
  echo ""
  echo -e "${CYAN}============================================================${NC}"
  echo -e "${CYAN}  $1${NC}"
  echo -e "${CYAN}============================================================${NC}"
}

sub_divider() {
  echo ""
  echo -e "${YELLOW}  --- $1 ---${NC}"
}

pass() {
  PASS=$((PASS + 1))
  echo -e "  ${GREEN}✅ PASS: $1${NC}"
}

fail() {
  FAIL=$((FAIL + 1))
  echo -e "  ${RED}❌ FAIL: $1${NC}"
}

# 备份文件
backup_file() {
  cp "$1" "$1.bak"
}

# 恢复文件
restore_file() {
  mv "$1.bak" "$1"
}

# 断言命令成功执行
assert_success() {
  local desc="$1"
  shift
  if "$@" > /dev/null 2>&1; then
    pass "$desc"
  else
    fail "$desc (命令执行失败)"
  fi
}

# 断言命令失败执行
assert_fail() {
  local desc="$1"
  shift
  if "$@" > /dev/null 2>&1; then
    fail "$desc (命令应失败但成功了)"
  else
    pass "$desc"
  fi
}

# 断言输出包含特定文本
assert_output_contains() {
  local desc="$1"
  local expected="$2"
  shift 2
  local output
  output=$("$@" 2>&1) || true
  if echo "$output" | grep -qF -- "$expected"; then
    pass "$desc"
  else
    fail "$desc (输出不包含: '$expected')"
    echo "    实际输出前 200 字符: ${output:0:200}"
  fi
}

# 断言文件包含特定文本
assert_file_contains() {
  local desc="$1"
  local file="$2"
  local expected="$3"
  if grep -qF -- "$expected" "$file"; then
    pass "$desc"
  else
    fail "$desc (文件不包含: '$expected')"
  fi
}

# 断言文件不包含特定文本
assert_file_not_contains() {
  local desc="$1"
  local file="$2"
  local expected="$3"
  if grep -qF -- "$expected" "$file"; then
    fail "$desc (文件不应包含: '$expected')"
  else
    pass "$desc"
  fi
}

# ======================== 测试开始 ========================

echo ""
echo -e "${CYAN}🧪 @mp-svg-icons/utils — CLI 完整测试${NC}"
echo ""
echo "📁 工作目录: $(pwd)"
echo "📁 SVG CLI: $CLEAR_CLI"
echo "📁 iconfont CLI: $ICONFONT_CLI"

# 检查 CLI 文件是否存在
if [ ! -f "$CLEAR_CLI" ]; then
  echo -e "${RED}❌ 找不到 SVG 裁剪 CLI: $CLEAR_CLI${NC}"
  echo "   请先执行 pnpm build 编译 utils 包"
  exit 1
fi

if [ ! -f "$ICONFONT_CLI" ]; then
  echo -e "${RED}❌ 找不到 iconfont 裁剪 CLI: $ICONFONT_CLI${NC}"
  echo "   请先执行 pnpm build 编译 utils 包"
  exit 1
fi

# ================================================================
# 测试 1: mp-svg-icons-clear — 帮助信息
# ================================================================
divider "测试 1: mp-svg-icons-clear --help"

assert_output_contains "帮助信息包含用法说明" "mp-svg-icons-clear" node "$CLEAR_CLI" --help
assert_output_contains "帮助信息包含 --pkg-dir 说明" "--pkg-dir" node "$CLEAR_CLI" --help
assert_output_contains "帮助信息包含 --scan 说明" "--scan" node "$CLEAR_CLI" --help
assert_output_contains "帮助信息包含 --icons 说明" "--icons" node "$CLEAR_CLI" --help
assert_output_contains "帮助信息包含 --dry-run 说明" "--dry-run" node "$CLEAR_CLI" --help

# ================================================================
# 测试 2: mp-svg-icons-clear — 参数校验
# ================================================================
divider "测试 2: mp-svg-icons-clear — 参数校验"

sub_divider "2.1 缺少 --pkg-dir"
assert_fail "缺少 --pkg-dir 时报错退出" node "$CLEAR_CLI" --scan ./pages

sub_divider "2.2 缺少 --scan 和 --icons"
assert_fail "缺少 --scan 和 --icons 时报错退出" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR"

sub_divider "2.3 --pkg-dir 路径不存在"
assert_fail "--pkg-dir 不存在时报错退出" node "$CLEAR_CLI" --pkg-dir /nonexistent/path --icons add

# ================================================================
# 测试 3: mp-svg-icons-clear — dry-run 扫描模式
# ================================================================
divider "测试 3: mp-svg-icons-clear — dry-run 扫描模式"

sub_divider "3.1 扫描所有页面 (dry-run)"
assert_output_contains "显示预览模式标记" "预览模式" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --scan ./pages --dry-run
assert_output_contains "输出品牌信息" "tdesign" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --scan ./pages --dry-run
assert_output_contains "输出裁剪统计" "保留" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --scan ./pages --dry-run

sub_divider "3.2 扫描单个目录 (dry-run)"
assert_output_contains "扫描 index 页面" "add" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --scan ./pages/index --dry-run

# ================================================================
# 测试 4: mp-svg-icons-clear — 手动指定图标 (dry-run)
# ================================================================
divider "测试 4: mp-svg-icons-clear — 手动指定图标 (dry-run)"

sub_divider "4.1 指定保留图标"
assert_output_contains "保留指定图标" "add" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons add,close,home --dry-run
assert_output_contains "显示裁剪统计" "移除" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons add,close,home --dry-run

sub_divider "4.2 指定不存在的图标"
assert_output_contains "不存在的图标有警告" "未找到" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons add,nonexistent --dry-run

# ================================================================
# 测试 5: mp-svg-icons-clear — 混合模式 (dry-run)
# ================================================================
divider "测试 5: mp-svg-icons-clear — 混合模式 (dry-run)"

assert_output_contains "混合模式输出" "手动指定" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --scan ./pages --icons setting,loading --dry-run

# ================================================================
# 测试 6: mp-svg-icons-clear — 实际裁剪
# ================================================================
divider "测试 6: mp-svg-icons-clear — 实际裁剪"

sub_divider "6.1 实际裁剪后验证并恢复"
backup_file "$ICONS_JS"

node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons add,close

assert_file_contains "裁剪后 add 仍存在" "$ICONS_JS" '"add"'
assert_file_contains "裁剪后 close 仍存在" "$ICONS_JS" '"close"'
assert_file_not_contains "裁剪后 search 已移除" "$ICONS_JS" '"search"'
assert_file_not_contains "裁剪后 setting 已移除" "$ICONS_JS" '"setting"'

restore_file "$ICONS_JS"
assert_file_contains "文件已恢复 (setting 存在)" "$ICONS_JS" '"setting"'

# ================================================================
# 测试 7: mp-iconfont-clear — 帮助信息
# ================================================================
divider "测试 7: mp-iconfont-clear --help"

assert_output_contains "帮助信息包含用法说明" "mp-iconfont-clear" node "$ICONFONT_CLI" --help
assert_output_contains "帮助信息包含 --pkg-dir 说明" "--pkg-dir" node "$ICONFONT_CLI" --help
assert_output_contains "帮助信息包含 iconfont 说明" "iconfont" node "$ICONFONT_CLI" --help

# ================================================================
# 测试 8: mp-iconfont-clear — 参数校验
# ================================================================
divider "测试 8: mp-iconfont-clear — 参数校验"

sub_divider "8.1 缺少 --pkg-dir"
assert_fail "缺少 --pkg-dir 时报错退出" node "$ICONFONT_CLI" --scan ./pages

sub_divider "8.2 缺少 --scan 和 --icons"
assert_fail "缺少 --scan 和 --icons 时报错退出" node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR"

sub_divider "8.3 --pkg-dir 路径不存在"
assert_fail "--pkg-dir 不存在时报错退出" node "$ICONFONT_CLI" --pkg-dir /nonexistent/path --icons home

# ================================================================
# 测试 9: mp-iconfont-clear — TDesign (dry-run)
# ================================================================
divider "测试 9: mp-iconfont-clear — TDesign (dry-run)"

sub_divider "9.1 扫描所有页面"
assert_output_contains "检测到 t-icon 前缀" "t-icon" node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR" --scan ./pages --dry-run
assert_output_contains "输出裁剪统计" "保留" node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR" --scan ./pages --dry-run

sub_divider "9.2 手动指定图标"
assert_output_contains "手动指定图标" "手动指定" node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR" --icons home,search,close --dry-run

# ================================================================
# 测试 10: mp-iconfont-clear — Vant (dry-run)
# ================================================================
divider "测试 10: mp-iconfont-clear — Vant (dry-run)"

sub_divider "10.1 扫描所有页面"
assert_output_contains "检测到 van-icon 前缀" "van-icon" node "$ICONFONT_CLI" --pkg-dir "$VANT_PKG_DIR" --scan ./pages --dry-run
assert_output_contains "输出裁剪统计" "保留" node "$ICONFONT_CLI" --pkg-dir "$VANT_PKG_DIR" --scan ./pages --dry-run

sub_divider "10.2 手动指定图标"
assert_output_contains "手动指定图标" "手动指定" node "$ICONFONT_CLI" --pkg-dir "$VANT_PKG_DIR" --icons close,search,wechat --dry-run

# ================================================================
# 测试 11: mp-iconfont-clear — 实际裁剪
# ================================================================
divider "测试 11: mp-iconfont-clear — 实际裁剪"

sub_divider "11.1 TDesign 实际裁剪后恢复"
backup_file "$TDESIGN_CSS"

node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR" --icons home,close

assert_file_contains "裁剪后 t-icon-home 仍存在" "$TDESIGN_CSS" ".t-icon-home:before"
assert_file_contains "裁剪后 t-icon-close 仍存在" "$TDESIGN_CSS" ".t-icon-close:before"
assert_file_not_contains "裁剪后 t-icon-search 已移除" "$TDESIGN_CSS" ".t-icon-search:before"

restore_file "$TDESIGN_CSS"
assert_file_contains "TDesign CSS 已恢复" "$TDESIGN_CSS" ".t-icon-search:before"

sub_divider "11.2 Vant 实际裁剪后恢复"
backup_file "$VANT_CSS"

node "$ICONFONT_CLI" --pkg-dir "$VANT_PKG_DIR" --icons close,search

assert_file_contains "裁剪后 van-icon-close 仍存在" "$VANT_CSS" ".van-icon-close:before"
assert_file_contains "裁剪后 van-icon-search 仍存在" "$VANT_CSS" ".van-icon-search:before"
assert_file_not_contains "裁剪后 van-icon-home-o 已移除" "$VANT_CSS" ".van-icon-home-o:before"

restore_file "$VANT_CSS"
assert_file_contains "Vant CSS 已恢复" "$VANT_CSS" ".van-icon-home-o:before"

# ================================================================
# 测试 12: 多目录扫描
# ================================================================
divider "测试 12: 多目录扫描"

sub_divider "12.1 同时扫描多个目录"
assert_output_contains "多目录扫描工作正常" "保留" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --scan ./pages/index ./pages/multi-brand ./pages/subpackage --dry-run

# ================================================================
# 测试 13: mp-svg-icons-clear — --icons 对象格式（按品牌精确指定）
# ================================================================
divider "测试 13: mp-svg-icons-clear — --icons 对象格式"

sub_divider "13.1 JSON 对象格式 (dry-run)"
assert_output_contains "JSON 对象格式能正常解析" "tdesign" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons '{"tdesign":["add","close"],"material":["home"]}' --dry-run
assert_output_contains "JSON 对象格式保留 add" "add" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons '{"tdesign":["add","close"],"material":["home"]}' --dry-run

sub_divider "13.2 简化对象格式 (dry-run)"
assert_output_contains "简化对象格式能正常解析" "tdesign" node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons "{ tdesign: ['add','close'], material: ['home'] }" --dry-run

sub_divider "13.3 对象格式实际裁剪后验证并恢复"
backup_file "$ICONS_JS"

node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons '{"tdesign":["add"],"material":["home"]}'

assert_file_contains "裁剪后 tdesign add 仍存在" "$ICONS_JS" '"add"'
assert_file_contains "裁剪后 material home 仍存在" "$ICONS_JS" '"home"'
assert_file_not_contains "裁剪后 search 已移除" "$ICONS_JS" '"search"'
assert_file_not_contains "裁剪后 setting 已移除" "$ICONS_JS" '"setting"'
assert_file_not_contains "裁剪后 star 已移除" "$ICONS_JS" '"star"'

restore_file "$ICONS_JS"
assert_file_contains "文件已恢复 (setting 存在)" "$ICONS_JS" '"setting"'

sub_divider "13.4 仅指定一个品牌（另一品牌全部裁剪）"
backup_file "$ICONS_JS"

node "$CLEAR_CLI" --pkg-dir "$SVG_PKG_DIR" --icons '{"tdesign":["add","close"]}'

assert_file_contains "裁剪后 tdesign add 仍存在" "$ICONS_JS" '"add"'
assert_file_contains "裁剪后 tdesign close 仍存在" "$ICONS_JS" '"close"'
# material 品牌未在对象中指定，其图标应全部被裁剪
assert_file_not_contains "裁剪后 material star 已移除" "$ICONS_JS" '"star"'

restore_file "$ICONS_JS"
assert_file_contains "文件已恢复 (star 存在)" "$ICONS_JS" '"star"'

# ================================================================
# 测试 14: mp-iconfont-clear — --icons 对象格式报错
# ================================================================
divider "测试 14: mp-iconfont-clear — --icons 对象格式报错"

sub_divider "14.1 传入对象格式应报错退出"
assert_fail "对象格式应报错退出" node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR" --icons '{"tdesign":["add","close"]}'
assert_output_contains "报错信息提示不支持对象格式" "不支持按品牌分组的对象格式" node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR" --icons '{"tdesign":["add","close"]}'

sub_divider "14.2 传入简化对象格式也应报错"
assert_fail "简化对象格式也应报错退出" node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR" --icons "{ tdesign: ['add','close'] }"
assert_output_contains "简化格式报错信息正确" "不支持按品牌分组的对象格式" node "$ICONFONT_CLI" --pkg-dir "$TDESIGN_PKG_DIR" --icons "{ tdesign: ['add','close'] }"

# ======================== 结果汇总 ========================

echo ""
divider "📊 CLI 测试结果汇总"
echo ""
TOTAL=$((PASS + FAIL))
echo -e "  总计: ${TOTAL} 个断言"
echo -e "  通过: ${GREEN}${PASS} ✅${NC}"
echo -e "  失败: ${RED}${FAIL} ❌${NC}"

if [ $TOTAL -gt 0 ]; then
  RATE=$(echo "scale=1; $PASS * 100 / $TOTAL" | bc)
  echo -e "  通过率: ${RATE}%"
fi

echo ""
if [ $FAIL -gt 0 ]; then
  echo -e "${RED}⚠️ 存在失败的测试，请检查上方输出！${NC}"
  exit 1
else
  echo -e "${GREEN}🎉 所有 CLI 测试通过！${NC}"
fi

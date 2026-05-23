#!/usr/bin/env node
/**
 * @mp-svg-icons/utils— CLI 入口
 *
 * 用法:
 *   npx mp-svg-icons-clear --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat --scan ./pages ./components
 *   npx mp-svg-icons-clear --pkg-dir ./miniprogram_npm/@mp-svg-icons/alipay --icons add,close,check-circle
 *   npx mp-svg-icons-clear --pkg-dir ./miniprogram_npm/@mp-svg-icons/kuaishou --scan ./pages --icons loading --dry-run
 *
 * 参数:
 *   --pkg-dir <path>     (必填) 构建产物中图标包所在目录
 *   --scan <dirs...>     扫描指定目录中的源文件（支持多个目录，空格分隔），
 *                        应覆盖所有使用了图标的目录，包括分包目录（subpackages）
 *   --icons <names>      手动指定要保留的图标名（逗号分隔）
 *   --dry-run            仅打印将被移除的图标，不实际执行
 *   -h, --help           显示帮助信息
 */

import type { ClearOptions } from './types';
import { CLI_BIN_NAME } from './constants';
import { clear } from './index';
import { parseBaseArgs, validateIconSource } from '../shared/cli';

// ======================== CLI 帮助信息 ========================

function printHelp(): void {
  console.log(`
mp-svg-icons-clear — 小程序图标组件裁剪 CLI 工具

用法:
  npx ${CLI_BIN_NAME} --pkg-dir <path> [--scan <dirs...>] [--icons <names>] [--dry-run]

参数:
  --pkg-dir <path>     （必填）构建产物中图标包所在目录
  --scan <dirs...>     扫描指定目录中的源文件（支持多个目录，空格分隔）
  --icons <names>      手动指定要保留的图标名，支持两种格式：
                         列表格式: add,close,check-circle
                         品牌格式: { tdesign: ['add','close'], material: ['home'] }
  --dry-run            仅预览，不实际修改文件
  -h, --help           显示帮助信息

说明:
  工具会自动解析 app.json 及扫描目录中 .json 文件的 usingComponents，
  识别所有引用图标包图标组件（Icon）的自定义标签名
  （如 t-icon、test、my-icon），然后精确匹配模板文件中这些标签的 name 属性值。

  注意：本工具为静态分析工具，无法识别 JS/TS 中动态赋值的图标名。
  对于动态图标，请通过 --icons 参数手动指定。

  裁剪目标（均为可选，不存在则自动跳过）：
    1. icon/icons.js — SVG 图标映射表（移除未使用的 SVG 数据）

  支持的小程序平台：
    微信(.wxml/.wxss) | 支付宝(.axml/.acss) | 百度(.swan/.css)
    抖音(.ttml/.ttss) | 快手(.ksml/.css) | 小红书(.xhsml/.css) | 京东(.jxml/.jxss)

  扫描时自动排除 node_modules 和 --pkg-dir 指定的目录，
  防止图标包自身被误识别为"已使用图标"。

示例:
  npx ${CLI_BIN_NAME} --pkg-dir ./miniprogram_npm/@mp-svg-icons/wechat --scan ./pages ./components
  npx ${CLI_BIN_NAME} --pkg-dir ./miniprogram_npm/@mp-svg-icons/alipay --icons add,close,check-circle
  npx ${CLI_BIN_NAME} --pkg-dir ./miniprogram_npm/@mp-svg-icons/kuaishou --scan ./pages --icons loading --dry-run
`);
}

// ======================== CLI 参数解析 ========================

function parseCLIArgs(): ClearOptions {
  let pkgDir: string | undefined;

  const baseOptions = parseBaseArgs(printHelp, [
    {
      argName: '--pkg-dir',
      setValue: (value: string) => {
        pkgDir = value;
      },
    },
  ]);

  // 校验 --pkg-dir 必填
  if (!pkgDir) {
    console.error('❌ --pkg-dir 为必填参数\n');
    printHelp();
    process.exit(1);
  }

  // 校验至少有一种图标来源
  validateIconSource(baseOptions.scanDirs, baseOptions.icons, printHelp);

  return {
    scanDirs: baseOptions.scanDirs,
    icons: baseOptions.icons,
    pkgDir,
    dryRun: baseOptions.dryRun,
  };
}

// ======================== CLI 入口 ========================

/**
 * 本文件为 CLI 独立入口，应通过 package.json bin 字段直接指向此文件。
 * 作为纯入口文件，无条件执行 CLI 逻辑，不再依赖 require.main === module 等判断。
 */
const options = parseCLIArgs();
try {
  clear(options);
} catch (err) {
  console.error('\n❌ 裁剪失败:', err instanceof Error ? err.message : String(err));
  process.exit(1);
}

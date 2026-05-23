#!/usr/bin/env node
/**
 * @mp-svg-icons/utils — iconfont 裁剪 CLI 入口
 *
 * 用法:
 *   npx mp-iconfont-clear --pkg-dir ./miniprogram_npm/tdesign-miniprogram --scan ./pages ./components
 *   npx mp-iconfont-clear --pkg-dir ./miniprogram_npm/@vant/weapp --icons close,search
 *   npx mp-iconfont-clear --pkg-dir ./miniprogram_npm/tdesign-miniprogram --scan ./pages --icons loading --dry-run
 *
 * 参数:
 *   --pkg-dir <path>     (必填) iconfont 组件库的 npm 包目录路径
 *   --scan <dirs...>     扫描指定目录中的源文件（支持多个目录，空格分隔）
 *   --icons <names>      手动指定要保留的图标名（逗号分隔）
 *   --dry-run            仅打印将被移除的图标，不实际执行
 *   -h, --help           显示帮助信息
 */

import type { IconfontClearOptions } from './types';
import { CLI_BIN_NAME } from './constants';
import { iconfontClear } from './index';
import { parseBaseArgs, validateIconSource } from '../shared/cli';

function printHelp(): void {
  console.log(`
mp-iconfont-clear — 小程序 iconfont 图标裁剪 CLI 工具

用法:
  npx ${CLI_BIN_NAME} --pkg-dir <path> [--scan <dirs...>] [--icons <names>] [--dry-run]

参数:
  --pkg-dir <path>     （必填）iconfont 组件库的 npm 包目录路径
  --scan <dirs...>     扫描指定目录中的源文件（支持多个目录，空格分隔）
  --icons <names>      手动指定要保留的图标名（逗号分隔）
  --dry-run            仅预览，不实际修改文件
  -h, --help           显示帮助信息

说明:
  工具会自动解析 app.json 及扫描目录中 .json 文件的 usingComponents，
  识别所有引用 iconfont 图标组件的自定义标签名（如 t-icon、vant-icon），
  然后精确匹配模板文件中这些标签的 name 属性值。

  --pkg-dir 指向 npm 包根目录，工具会自动检测其下的 icon 子目录及样式文件。

  注意：本工具为静态分析工具，无法识别 JS/TS 中动态赋值的图标名。
  对于动态图标，请通过 --icons 参数手动指定。

  裁剪目标：
    icon 子目录下的样式文件（.wxss/.acss/.css/.ttss）
    移除未使用图标的 CSS 规则（.prefix-iconName:before{content:...}）

  支持的组件库（不限于此）：
    tdesign-miniprogram、@vant/weapp 等使用 iconfont 方案的组件库

  支持的小程序平台：
    微信(.wxml) | 支付宝(.axml) | 百度(.swan)
    抖音(.ttml) | 快手(.ksml) | 小红书(.xhsml) | 京东(.jxml)

  扫描时自动排除 node_modules 和 miniprogram_npm 目录，
  防止图标组件自身被误识别为"已使用图标"。

示例:
  npx ${CLI_BIN_NAME} --pkg-dir ./miniprogram_npm/tdesign-miniprogram --scan ./pages ./components
  npx ${CLI_BIN_NAME} --pkg-dir ./miniprogram_npm/@vant/weapp --icons close,search
  npx ${CLI_BIN_NAME} --pkg-dir ./miniprogram_npm/tdesign-miniprogram --scan ./pages --icons loading --dry-run
`);
}

function parseCLIArgs(): IconfontClearOptions {
  let pkgDir: string | undefined;

  const baseOptions = parseBaseArgs(printHelp, [
    {
      argName: '--pkg-dir',
      setValue: (value: string) => {
        pkgDir = value;
      },
    },
  ]);

  if (!pkgDir) {
    console.error('❌ --pkg-dir 为必填参数\n');
    printHelp();
    process.exit(1);
  }

  validateIconSource(baseOptions.scanDirs, baseOptions.icons, printHelp);

  // iconfont-clear 没有品牌概念，不支持对象格式
  if (!Array.isArray(baseOptions.icons)) {
    console.error('❌ --icons 参数错误：mp-iconfont-clear 不支持按品牌分组的对象格式，请使用逗号分隔的图标名列表\n');
    printHelp();
    process.exit(1);
  }
  const icons: string[] = baseOptions.icons;

  return {
    scanDirs: baseOptions.scanDirs,
    icons,
    pkgDir,
    dryRun: baseOptions.dryRun,
  };
}

const options = parseCLIArgs();
try {
  iconfontClear(options);
} catch (err) {
  console.error('\n❌ 裁剪失败:', err instanceof Error ? err.message : String(err));
  process.exit(1);
}

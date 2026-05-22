/** CLI 基础选项（公共部分） */
export interface BaseCLIOptions {
  /** 要扫描的源码目录 */
  scanDirs: string[];
  /** 手动指定保留的图标名列表 */
  icons: string[];
  /** 仅预览，不实际修改 */
  dryRun: boolean;
}

/** 自定义参数处理器 */
export interface CustomArgHandler {
  /** 自定义参数名（如 '--pkg-dir' 或 '--icon-dir'） */
  readonly argName: string;
  /** 参数值设置回调 */
  setValue: (value: string) => void;
}

/**
 * 解析 CLI 公共参数
 *
 * 解析 --scan、--icons、--dry-run 等公共参数，
 * 同时通过 customArgs 支持各工具特有的参数（如 --pkg-dir、--icon-dir）。
 *
 * @param printHelp 帮助信息打印函数
 * @param customArgs 自定义参数处理器列表
 * @returns 基础选项
 */
export function parseBaseArgs(printHelp: () => void, customArgs: CustomArgHandler[]): BaseCLIOptions {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  const scanDirs: string[] = [];
  let icons: string[] = [];
  let dryRun = false;

  // 构建自定义参数名集合
  const customArgNames = new Set(customArgs.map((h) => h.argName));

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (arg === '--scan') {
      i++;
      while (i < args.length && !args[i].startsWith('--') && args[i] !== '-h') {
        scanDirs.push(args[i]);
        i++;
      }
    } else if (arg === '--icons') {
      i++;
      if (i < args.length) {
        icons = args[i]
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        i++;
      }
    } else if (arg === '--dry-run') {
      dryRun = true;
      i++;
    } else if (customArgNames.has(arg)) {
      const handler = customArgs.find((h) => h.argName === arg)!;
      i++;
      if (i < args.length) {
        handler.setValue(args[i]);
        i++;
      }
    } else {
      console.warn(`⚠️ 未知参数: ${arg}`);
      i++;
    }
  }

  return { scanDirs, icons, dryRun };
}

/**
 * 校验至少有一种图标来源
 */
export function validateIconSource(scanDirs: string[], icons: string[], printHelp: () => void): void {
  if (scanDirs.length === 0 && icons.length === 0) {
    console.error('❌ --scan 和 --icons 至少需要指定一个\n');
    printHelp();
    process.exit(1);
  }
}

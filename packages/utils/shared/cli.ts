/** 手动指定保留的图标，支持数组或按品牌分组的对象 */
export type IconsCLIOption = string[] | Record<string, string[]>;

/** CLI 基础选项（公共部分） */
export interface BaseCLIOptions {
  /** 要扫描的源码目录 */
  scanDirs: string[];
  /** 手动指定保留的图标名列表（支持数组或按品牌分组的对象） */
  icons: IconsCLIOption;
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
 * 解析 --icons 参数值
 *
 * 支持两种格式：
 * 1. 简单列表：`add,close,check-circle` → string[]
 * 2. 按品牌分组：`{ tdesign: ['add','close'], material: ['home'] }` → Record<string, string[]>
 */
function parseIconsArg(value: string): IconsCLIOption {
  const trimmed = value.trim();

  // 检测是否为对象格式（以 { 开头）
  if (trimmed.startsWith('{')) {
    try {
      // 尝试解析为 JSON 对象
      // 支持格式：{ "tdesign": ["add","close"], "material": ["home"] }
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        const result: Record<string, string[]> = {};
        for (const [key, val] of Object.entries(parsed)) {
          if (Array.isArray(val)) {
            result[key] = (val as string[]).map((s) => s.trim()).filter(Boolean);
          }
        }
        return result;
      }
    } catch {
      // JSON 解析失败，尝试简化格式解析
      // 支持格式：{ tdesign: ['add','close'], material: ['home'] }
      return parseSimplifiedBrandFormat(trimmed);
    }
  }

  // 简单逗号分隔列表
  return trimmed
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 解析简化的品牌格式（非严格 JSON）
 * 支持：{ tdesign: ['add','close'], material: ['home'] }
 */
function parseSimplifiedBrandFormat(input: string): IconsCLIOption {
  const result: Record<string, string[]> = {};

  // 移除外层花括号
  const inner = input.slice(1, -1).trim();
  if (!inner) return [];

  // 匹配 brandName: ['icon1','icon2',...] 模式
  const brandRegex = /(\w[\w-]*):\s*\[([^\]]*)\]/g;
  let match: RegExpExecArray | null;

  while ((match = brandRegex.exec(inner)) !== null) {
    const brandName = match[1].trim();
    const iconList = match[2]
      .split(',')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
    if (iconList.length > 0) {
      result[brandName] = iconList;
    }
  }

  if (Object.keys(result).length > 0) {
    return result;
  }

  // 解析失败，回退到普通逗号分隔
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 判断 icons 选项是否为空（无论是数组还是对象格式）
 */
export function isIconsEmpty(icons: IconsCLIOption): boolean {
  if (Array.isArray(icons)) {
    return icons.length === 0;
  }
  return Object.keys(icons).length === 0;
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
  let icons: IconsCLIOption = [];
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
        icons = parseIconsArg(args[i]);
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
export function validateIconSource(scanDirs: string[], icons: IconsCLIOption, printHelp: () => void): void {
  if (scanDirs.length === 0 && isIconsEmpty(icons)) {
    console.error('❌ --scan 和 --icons 至少需要指定一个\n');
    printHelp();
    process.exit(1);
  }
}

/**
 * iconfont-clear — 类型定义
 */

/** 裁剪选项 */
export interface IconfontClearOptions {
  /** 要扫描的源码目录（相对于 cwd） */
  readonly scanDirs: readonly string[];
  /** 手动指定保留的图标名列表 */
  readonly icons: readonly string[];
  /** npm 包目录路径（如 ./miniprogram_npm/tdesign-miniprogram） */
  readonly pkgDir: string;
  /** 仅预览，不实际修改 */
  readonly dryRun: boolean;
}

/** 裁剪结果 */
export interface IconfontClearResult {
  /** npm 包目录路径 */
  readonly pkgDir: string;
  /** CSS 前缀（如 "t-icon"、"van-icon"） */
  readonly cssPrefix: string;
  /** 图标总数 */
  readonly totalCount: number;
  /** 保留的图标名列表 */
  readonly usedIcons: readonly string[];
  /** 被裁剪的图标名列表 */
  readonly removedIcons: readonly string[];
  /** 节省的字节数 */
  readonly savedBytes: number;
}

/** iconfont CSS 数据 */
export interface IconfontCssData {
  readonly filePath: string;
  readonly prefix: string;
  /** 图标名到 CSS 规则的映射 */
  readonly iconRules: Map<string, string>;
  /** 非图标规则内容（基础样式、font-face 等） */
  readonly baseContent: string;
  readonly originalSize: number;
}

/** iconfont 组件信息 */
export interface IconfontComponentInfo {
  readonly dir: string;
  readonly cssFilePath: string;
  readonly prefix: string;
  readonly pathRegex: RegExp;
}

/** 扫描上下文 */
export interface IconfontScanContext {
  readonly pkgDir: string;
  readonly excludeDirs: Set<string>;
  readonly allIconNameSet: Set<string>;
  readonly dryRun: boolean;
  readonly prefix: string;
  readonly iconPathRegex: RegExp;
}

/** 扫描结果 */
export interface IconfontScanResult {
  readonly iconTagNames: Set<string>;
  readonly usedIcons: Set<string>;
}

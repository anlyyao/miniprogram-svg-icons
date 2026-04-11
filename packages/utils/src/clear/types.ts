/**
 * @mp-svg-icons/utils— 类型定义
 */

export interface ClearOptions {
  /** 要扫描的源码目录（相对于 cwd） */
  readonly scanDirs: readonly string[];
  /**
   * 手动指定保留的图标名列表
   *
   * 注意：--icons 仅将图标添加到通用组件（icon）的保留集合中，
   * 不会保护对应的单图标组件目录（如 add-icon/）。
   * 单图标组件目录的保留仅依赖 --scan 扫描 usingComponents 中的实际引用。
   */
  readonly includeIcons: readonly string[];
  /** 构建产物中图标包所在目录（必填） */
  readonly pkgDir: string;
  /** 仅预览，不实际修改 */
  readonly dryRun: boolean;
}

/** 单个组件类型的裁剪结果 */
export interface ComponentClearResult {
  /** 该组件中使用中的图标名列表 */
  readonly usedIcons: readonly string[];
  /** 该组件中被移除的图标名列表 */
  readonly removedIcons: readonly string[];
  /** 节省的文件大小（字节） */
  readonly savedBytes: number;
}

export interface ClearResult {
  /** 全局去重后使用中的图标总数 */
  readonly usedCount: number;
  /** 全局去重后被裁剪的图标总数 */
  readonly removedCount: number;
  /** 全局去重后的图标总数 */
  readonly totalCount: number;
  /** 全局去重后使用中的图标列表 */
  readonly usedIcons: readonly string[];
  /** 全局去重后被裁剪的图标列表 */
  readonly removedIcons: readonly string[];
  /** 总计节省的文件大小（字节） */
  readonly totalSavedBytes: number;
  /** icon 组件裁剪结果（不存在时为 null） */
  readonly icon: (ComponentClearResult & { readonly removedDir: boolean }) | null;
  /** 单图标组件裁剪结果 */
  readonly singleIcon: ComponentClearResult & { readonly removedDirs: number };
  /** common 公共 Behavior 目录裁剪结果 */
  readonly common: { readonly removedDir: boolean; readonly savedBytes: number };
}

/**
 * 品牌信息
 * 每个品牌有独立的单图标组件目录
 */
export interface BrandInfo {
  /** 品牌名称 */
  readonly name: string;
  /** 品牌单图标组件目录绝对路径（pkgDir/{brand}） */
  readonly dir: string;
}

/** 扫描上下文：在各阶段间共享的运行时数据 */
export interface ScanContext {
  /** 解析后的图标包绝对路径 */
  readonly pkgDir: string;
  /** 图标包目录名（basename） */
  readonly pkgDirName: string;
  /** 排除的目录集合 */
  readonly excludeDirs: Set<string>;
  /** 全量图标名集合 */
  readonly allIconNameSet: Set<string>;
  /** 是否为 dry-run 模式 */
  readonly dryRun: boolean;
  /** 品牌列表 */
  readonly brands: readonly BrandInfo[];
  /** 品牌名集合（用于快速判断） */
  readonly brandNameSet: Set<string>;
  /** 默认品牌（优先 tdesign，否则第一个品牌） */
  readonly defaultBrand: string;
  /** 预编译的 icon 路径匹配正则 */
  readonly iconPathRegex: RegExp;
  /** 预编译的单图标组件路径匹配正则 */
  readonly singleIconPathRegex: RegExp;
}

/** 单个品牌的图标数据加载结果 */
export interface BrandIconDataLoadResult {
  readonly brand: BrandInfo;
  readonly singleIconDirs: readonly string[];
  /** 该品牌的图标名集合（icons + 单图标组件） */
  readonly iconNameSet: Set<string>;
}

/** 图标数据加载结果（多品牌） */
export interface IconDataLoadResult {
  /** 各品牌的图标数据 */
  readonly brandResults: readonly BrandIconDataLoadResult[];
  /** 全量图标名集合（所有品牌合并去重） */
  readonly allIconNameSet: Set<string>;
  /** 合并后的 icons.js 数据（可能为 null） */
  readonly mergedIconsData: MergedIconsData | null;
}

/** 合并后的 icons.js 数据结构 */
export interface MergedIconsData {
  /** 所有品牌的图标数据 { "brand1": { "icon1": "svg1", ... }, ... } */
  readonly data: Record<string, Record<string, string>>;
  /** icons.js 文件路径 */
  readonly filePath: string;
  /** 原始文件大小（字节） */
  readonly originalSize: number;
}

/** 文件扫描结果（合并 usingComponents 和模板图标名提取） */
export interface ScanResult {
  /** icon 通用组件的自定义标签名集合（按品牌分组，key 为品牌名） */
  readonly iconTagNamesByBrand: Map<string, Set<string>>;
  /** 单图标组件引用集合（按品牌分组，key 为品牌名） */
  readonly singleIconRefsByBrand: Map<string, Set<string>>;
  /** 通过 icon 通用组件使用的图标名（按品牌分组） */
  readonly iconsByBrand: Map<string, Set<string>>;
}

/** performClear 执行裁剪后的完整返回结果 */
export interface PerformClearResult {
  readonly iconSavedBytes: number;
  /** icon 整个目录是否被移除（当无任何引用时） */
  readonly iconDirRemoved: boolean;
  readonly removedDirCount: number;
  readonly singleSavedBytes: number;
  /** common 公共 Behavior 目录是否被移除（当 icon 和单图标组件均未引用时） */
  readonly commonDirRemoved: boolean;
  readonly commonSavedBytes: number;
  readonly iconUsed: readonly string[];
  readonly iconRemoved: readonly string[];
  readonly singleIconUsed: readonly string[];
  readonly singleIconRemoved: readonly string[];
  readonly unusedDirs: readonly string[];
  readonly globalRemovedSet: Set<string>;
  readonly usedIcons: Set<string>;
}

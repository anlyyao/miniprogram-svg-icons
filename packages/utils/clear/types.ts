/**
 * clear — 类型定义
 */

/** 手动指定保留的图标，支持数组或按品牌分组的对象 */
export type IconsOption = readonly string[] | Readonly<Record<string, readonly string[]>>;

/** 裁剪选项 */
export interface ClearOptions {
  /** 要扫描的源码目录（相对于 cwd） */
  readonly scanDirs: readonly string[];
  /** 手动指定保留的图标名列表（支持数组或按品牌分组的对象） */
  readonly icons: IconsOption;
  /** 构建产物中图标包所在目录（必填） */
  readonly pkgDir: string;
  /** 仅预览，不实际修改 */
  readonly dryRun: boolean;
}

/** 单品牌裁剪结果 */
export interface BrandClearResult {
  /** 品牌名称 */
  readonly brand: string;
  /** 该品牌的图标总数 */
  readonly totalCount: number;
  /** 使用中的图标名列表 */
  readonly usedIcons: readonly string[];
  /** 被裁剪的图标名列表 */
  readonly removedIcons: readonly string[];
}

/** 裁剪总结果 */
export interface ClearResult {
  /** 各品牌的裁剪结果 */
  readonly brands: readonly BrandClearResult[];
  /** 总计节省的文件大小（字节） */
  readonly totalSavedBytes: number;
}

/** 品牌信息 */
export interface BrandInfo {
  /** 品牌名称 */
  readonly name: string;
}

/** 扫描上下文 */
export interface ScanContext {
  /** 解析后的图标包绝对路径 */
  readonly pkgDir: string;
  /** 图标包目录名（basename） */
  readonly pkgDirName: string;
  /** 排除的目录集合 */
  readonly excludeDirs: Set<string>;
  /** 图标名集合 */
  readonly allIconNameSet: Set<string>;
  /** 是否为 dry-run 模式 */
  readonly dryRun: boolean;
  /** 品牌列表 */
  readonly brands: readonly BrandInfo[];
  /** 品牌名集合（用于快速判断） */
  readonly brandNameSet: Set<string>;
  /** 默认品牌（与 icon 组件的 brand 属性默认值一致，固定为 'tdesign'） */
  readonly defaultBrand: string;
  /** 预编译的 icon 路径匹配正则 */
  readonly iconPathRegex: RegExp;
}

/** 单品牌图标数据加载结果 */
export interface BrandIconDataLoadResult {
  readonly brand: BrandInfo;
  /** 该品牌的图标名集合 */
  readonly iconNameSet: Set<string>;
}

/** 图标数据加载总结果 */
export interface IconDataLoadResult {
  /** 各品牌的图标数据 */
  readonly brandResults: readonly BrandIconDataLoadResult[];
  /** 图标名集合（所有品牌合并去重） */
  readonly allIconNameSet: Set<string>;
  /** icons.js 数据（可能为 null） */
  readonly iconsData: IconsData | null;
}

/** icons.js 解析后的数据结构 */
export interface IconsData {
  /** 所有品牌的图标数据 { "brand1": { "icon1": "svg1", ... }, ... } */
  readonly data: Record<string, Record<string, string>>;
  /** icons.js 文件路径 */
  readonly filePath: string;
  /** 原始文件大小（字节） */
  readonly originalSize: number;
}

/** 扫描结果 */
export interface ScanResult {
  /** icon 通用组件的自定义标签名集合（按品牌分组，key 为品牌名） */
  readonly iconTagNamesByBrand: Map<string, Set<string>>;
  /** 通过 icon 通用组件使用的图标名（按品牌分组） */
  readonly iconsByBrand: Map<string, Set<string>>;
}

/** 裁剪执行结果 */
export interface PerformClearResult {
  /** 各品牌的使用/移除图标 */
  readonly brandResults: ReadonlyMap<string, { used: readonly string[]; removed: readonly string[]; total: number }>;
  /** 总节省字节数 */
  readonly savedBytes: number;
}

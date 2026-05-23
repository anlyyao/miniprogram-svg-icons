/**
 * 共享常量定义
 */

/** app.json 文件名 */
export const APP_JSON_FILE = 'app.json';

/** JSON 配置文件扩展名 */
export const JSON_EXTENSIONS = new Set(['.json']);

/** 模板文件扩展名（各小程序平台） */
export const TEMPLATE_EXTENSIONS = new Set(['.wxml', '.axml', '.swan', '.ttml', '.ksml', '.xhsml', '.jxml']);

/** 源文件匹配扩展名（模板 + JSON） */
export const SCAN_EXTENSIONS = new Set([...TEMPLATE_EXTENSIONS, ...JSON_EXTENSIONS]);

/** 需要跳过的目录名 */
export const SKIP_DIR_NAMES = new Set(['node_modules', 'miniprogram_npm']);

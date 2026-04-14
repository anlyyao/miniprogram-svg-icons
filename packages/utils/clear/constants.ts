/**
 * @mp-svg-icons/utils— 常量定义
 */

/** app.json 文件名 */
export const APP_JSON_FILE = 'app.json';

/** JSON 配置文件扩展名（用于解析 usingComponents） */
export const JSON_EXTENSIONS = new Set(['.json']);

/** 模板文件扩展名（各小程序平台） */
export const TEMPLATE_EXTENSIONS = new Set([
  '.wxml', // 微信
  '.axml', // 支付宝
  '.swan', // 百度
  '.ttml', // 抖音
  '.ksml', // 快手
  '.xhsml', // 小红书
  '.jxml', // 京东
]);

/** 源文件匹配的扩展名（由 TEMPLATE_EXTENSIONS + JSON_EXTENSIONS 动态组合） */
export const SCAN_EXTENSIONS = new Set([...TEMPLATE_EXTENSIONS, ...JSON_EXTENSIONS]);

/** 需要跳过的目录名 */
export const SKIP_DIR_NAMES = new Set(['node_modules', 'miniprogram_npm']);

/** CLI bin 命令名 */
export const CLI_BIN_NAME = 'mp-svg-icons-clear';

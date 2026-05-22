export { formatBytes, escapeRegExp, resolveDir, isExcluded, walkDir } from './utils';
export { APP_JSON_FILE, JSON_EXTENSIONS, TEMPLATE_EXTENSIONS, SCAN_EXTENSIONS, SKIP_DIR_NAMES } from './constants';
export { extractIconTagNames, collectFiles } from './scanner';
export { parseBaseArgs, validateIconSource } from './cli';

export type { CollectedFiles } from './scanner';
export type { BaseCLIOptions, CustomArgHandler } from './cli';

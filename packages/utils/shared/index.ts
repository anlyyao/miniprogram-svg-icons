export { formatBytes, escapeRegExp, resolveDir, resolvePkgDir, isExcluded, walkDir } from './utils';
export { APP_JSON_FILE, JSON_EXTENSIONS, TEMPLATE_EXTENSIONS, SCAN_EXTENSIONS, SKIP_DIR_NAMES } from './constants';
export {
  extractIconTagNames,
  extractIconNamesSimple,
  extractIconNamesWithBrand,
  collectIconTagNames,
  collectFiles,
} from './scanner';
export { parseBaseArgs, validateIconSource } from './cli';
export { mergeManualIcons, warnIfNoUsedIcons, computeClearLists, printClearSummary } from './pipeline';

export type { CollectedFiles } from './scanner';
export type { BaseCLIOptions, CustomArgHandler } from './cli';
export type { ClearPipelineOptions, ClearPipelineResult } from './pipeline';

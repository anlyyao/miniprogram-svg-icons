import fs from 'fs';
import path from 'path';

import { JSON_EXTENSIONS, TEMPLATE_EXTENSIONS, APP_JSON_FILE } from './constants';
import { walkDir, isExcluded } from './utils';

/** 文件收集结果 */
export interface CollectedFiles {
  /** JSON 文件内容列表 */
  readonly jsonFiles: { content: string }[];
  /** 模板文件内容列表 */
  readonly templateFiles: { content: string }[];
}

/**
 * 从 JSON 文件中提取图标组件标签名
 *
 * 解析 usingComponents，匹配指向 icon 组件的路径，
 * 收集对应的自定义标签名（如 t-icon、my-icon）。
 */
export function extractIconTagNames(content: string, iconPathRegex: RegExp): Set<string> {
  const tagNames = new Set<string>();

  try {
    const json = JSON.parse(content);
    const usingComponents = json?.usingComponents;
    if (!usingComponents || typeof usingComponents !== 'object') {
      return tagNames;
    }

    for (const [tagName, componentPath] of Object.entries(usingComponents)) {
      if (typeof componentPath !== 'string') continue;

      const normalized = componentPath.replace(/\\/g, '/');
      if (iconPathRegex.test(normalized)) {
        tagNames.add(tagName);
      }
    }
  } catch {
    // JSON 解析失败，静默跳过
  }

  return tagNames;
}

/**
 * 收集扫描目录中的 JSON 和模板文件内容
 *
 * @param scanDirs 要扫描的目录列表
 * @param excludeDirs 需要排除的目录集合
 * @returns JSON 文件和模板文件的内容列表
 */
export function collectFiles(scanDirs: readonly string[], excludeDirs: Set<string>): CollectedFiles {
  const jsonFiles: { content: string }[] = [];
  const templateFiles: { content: string }[] = [];
  const processedJsonPaths = new Set<string>();

  // 优先读取 cwd 下的 app.json
  const cwdAppJson = path.resolve(process.cwd(), APP_JSON_FILE);
  if (fs.existsSync(cwdAppJson)) {
    try {
      jsonFiles.push({ content: fs.readFileSync(cwdAppJson, 'utf-8') });
      processedJsonPaths.add(cwdAppJson);
    } catch {
      // 静默跳过
    }
  }

  // 遍历扫描目录
  for (const dir of scanDirs) {
    const resolvedDir = path.resolve(process.cwd(), dir);

    if (!fs.existsSync(resolvedDir)) {
      console.warn(`⚠️ 扫描目录不存在，已跳过: ${dir}`);
      continue;
    }

    if (isExcluded(resolvedDir, excludeDirs)) {
      console.warn(`⚠️ 扫描目录位于排除路径内，已跳过: ${dir}`);
      continue;
    }

    for (const file of walkDir(resolvedDir, excludeDirs)) {
      let content: string;
      try {
        content = fs.readFileSync(file, 'utf-8');
      } catch {
        continue;
      }

      const ext = path.extname(file).toLowerCase();

      if (JSON_EXTENSIONS.has(ext)) {
        const resolvedFile = path.resolve(file);
        if (processedJsonPaths.has(resolvedFile)) continue;
        processedJsonPaths.add(resolvedFile);
        jsonFiles.push({ content });
      }
      if (TEMPLATE_EXTENSIONS.has(ext)) {
        templateFiles.push({ content });
      }
    }
  }

  return { jsonFiles, templateFiles };
}

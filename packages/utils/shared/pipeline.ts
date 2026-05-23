/**
 * 通用裁剪流程
 *
 * 抽取 clear 和 iconfont-clear 两个工具共有的执行步骤。
 */

import { formatBytes } from './utils';

/** 通用裁剪配置 */
export interface ClearPipelineOptions {
  /** 是否为 dry-run 预览模式 */
  readonly dryRun: boolean;
  /** 全量图标名集合（用于校验手动指定的图标是否存在） */
  readonly allIconNameSet: Set<string>;
  /** 手动指定保留的图标名列表 */
  readonly icons: readonly string[];
  /** 扫描得到的使用中图标 */
  readonly scannedIcons: Set<string>;
  /** 所有图标名列表（有序，用于统计和输出） */
  readonly allIconNames: readonly string[];
}

/** 通用裁剪结果 */
export interface ClearPipelineResult {
  /** 合并后使用中的图标集合 */
  readonly usedIcons: Set<string>;
  /** 保留的图标名列表 */
  readonly usedList: readonly string[];
  /** 被裁剪的图标名列表 */
  readonly removedList: readonly string[];
}

/**
 * 合并手动指定的图标到已使用集合
 * @param icons 手动指定的图标名列表
 * @param allIconNameSet 全量图标名集合
 * @param usedIcons 将被修改的使用中图标集合
 */
export function mergeManualIcons(icons: readonly string[], allIconNameSet: Set<string>, usedIcons: Set<string>): void {
  if (!icons.length) return;

  let validCount = 0;
  for (const icon of icons) {
    if (allIconNameSet.has(icon)) {
      usedIcons.add(icon);
      validCount++;
    } else {
      console.warn(`⚠️ 手动指定的图标未找到: ${icon}`);
    }
  }
  console.log(`📌 手动指定 ${icons.length} 个图标（有效 ${validCount} 个）`);
}

/** 检查并输出"无使用图标"警告 */
export function warnIfNoUsedIcons(usedIcons: Set<string>): void {
  if (usedIcons.size === 0) {
    console.warn(
      '⚠️ 扫描目录中未发现任何正在使用的图标，所有图标将被移除。\n' +
        '  如果这不符合预期，可通过 --icons 参数手动指定需要保留的图标名。',
    );
  }
}

/** 计算裁剪列表（保留/移除），单次遍历分组 */
export function computeClearLists(
  allIconNames: readonly string[],
  usedIcons: Set<string>,
): { usedList: string[]; removedList: string[] } {
  const usedList: string[] = [];
  const removedList: string[] = [];
  for (const name of allIconNames) {
    (usedIcons.has(name) ? usedList : removedList).push(name);
  }
  return { usedList, removedList };
}

/**
 * 打印通用裁剪汇总信息
 * @param options.labelPrefix 标签前缀（用于区分品牌等场景）
 */
export function printClearSummary(options: {
  dryRun: boolean;
  totalCount: number;
  usedList: readonly string[];
  removedList: readonly string[];
  savedBytes: number;
  labelPrefix?: string;
}): void {
  const { dryRun, totalCount, usedList, removedList, savedBytes, labelPrefix = '' } = options;

  if (!removedList.length) {
    console.log(`\n✅ 所有图标均在使用中，无需裁剪`);
    return;
  }

  console.log(`\n✅ ${dryRun ? '[预览模式] ' : ''}裁剪完成!`);
  console.log(`   📊 ${labelPrefix}保留 ${usedList.length} / ${totalCount} 个图标，移除 ${removedList.length} 个`);

  if (savedBytes > 0) {
    console.log(`   💾 节省: ${formatBytes(savedBytes)}`);
  }

  if (dryRun) {
    console.log(`\n💡 移除 --dry-run 参数以执行实际裁剪`);
  }

  if (usedList.length) {
    console.log(`\n📋 ${labelPrefix}保留的图标 (${usedList.length}):`);
    console.log(`   ${[...usedList].sort().join(', ')}`);
  }
}

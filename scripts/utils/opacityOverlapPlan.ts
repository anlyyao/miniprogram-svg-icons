import { DOMParser } from 'xmldom';
import { PaintType, SvgElement, getElementChildren, getTagName, getPaintTypes } from './svgDomHelpers';

/**
 * 透明度重叠——运行时按需挖除方案
 *
 * 与 `opacityOverlap.ts`（build 时静态注入 mask+use）不同，这里 build 时只产出一份
 * 极小的「挖除计划」，以 `data-cut` 属性挂在 `<svg>` 根节点上，不注入任何 `<mask>`/
 * `<defs>`；真正的 mask 构建推迟到运行时，仅当用户颜色确实带 alpha 时才现算现用。
 *
 * 计划基于「已完成颜色模板替换」的最终 SVG 字符串计算，确保下标与运行时
 * （`utils.js.tpl`）解析到的兄弟结构一一对应。
 *
 * 格式：`gTypes:group(;group)*`，`group := path#types`。
 * - `gTypes`：整体检测出重叠的 paint 类型，`f`/`s`/`fs` 之一。
 * - `path`：从根 `<svg>` 到该兄弟组容器的子节点下标链（`.` 连接，根组为空串）。
 * - `types`：容器每个直接子节点对应一个字符，`f`/`s` 表示单一fill/stroke 图层，
 *   `.` 为占位（保持下标对齐，结尾多余的 `.` 会被裁掉）。
 *
 * 挖除规则由 `types` 推导：命中 `gTypes` 的位置需挖掉其后所有单一 paint 兄弟覆盖的
 * 区域，不需要显式存储「谁挖谁」。
 */

const CONTAINER_SKIP_TAGS = new Set(['defs', 'mask', 'clippath', 'symbol']);

interface GroupPlan {
  path: number[];
  /** 每个直接子节点对应一个字符：'f' | 's' | '.'，已裁掉结尾多余的 '.' */
  types: string;
}

function typeChar(paintTypes: PaintType[]): 'f' | 's' | '.' {
  if (paintTypes.length !== 1) return '.';
  return paintTypes[0] === 'fill' ? 'f' : 's';
}

/**
 * 遍历树，为每个「至少存在一处需要挖除」的兄弟组容器生成 types 字符串。
 * 是否「需要挖除」只取决于：该位置自身是单一paint 图层、其类型命中 maskPaintTypes，
 * 且其后至少还有一个单一paint 兄弟（不要求类型相同——fill 可能被后面的 stroke 盖住，
 * 反之亦然）。
 */
function collectGroups(root: SvgElement, maskPaintTypes: PaintType[]): GroupPlan[] {
  const groups: GroupPlan[] = [];

  const visit = (node: SvgElement, path: number[]) => {
    if (CONTAINER_SKIP_TAGS.has(getTagName(node))) return;

    const children = getElementChildren(node);
    children.forEach((child, idx) => visit(child, [...path, idx]));

    const chars = children.map((child) => typeChar(getPaintTypes(child)));

    const hasTarget = chars.some((char, idx) => {
      if (char === '.') return false;
      const paintType: PaintType = char === 'f' ? 'fill' : 'stroke';
      if (!maskPaintTypes.includes(paintType)) return false;
      return chars.slice(idx + 1).some((upperChar) => upperChar !== '.');
    });
    if (!hasTarget) return;

    // 裁掉结尾多余的占位字符：其后已没有任何单一paint 节点会引用到它们
    let end = chars.length;
    while (end > 0 && chars[end - 1] === '.') end -= 1;

    groups.push({ path, types: chars.slice(0, end).join('') });
  };

  visit(root, []);
  return groups;
}

function encodePlan(groups: GroupPlan[], maskPaintTypes: PaintType[]): string {
  const gTypes = maskPaintTypes.map((paintType) => (paintType === 'fill' ? 'f' : 's')).join('');
  const groupsStr = groups.map((group) => `${group.path.join('.')}#${group.types}`).join(';');
  return `${gTypes}:${groupsStr}`;
}

/**
 * 基于「已完成颜色模板替换」的最终 SVG 字符串计算挖除计划。
 *
 * @param templatedSvg 由 `generateSvg(parseSvg(optimizedSvg))` 产出的最终模板字符串
 * @param maskPaintTypes 检测出确实存在几何重叠的 paint 类型（`detectOpacityOverlapPaintTypes` 的结果）
 * @returns 编码后的计划字符串；无需处理时返回 null
 */
export function computeOverlapPlanAttr(templatedSvg: string, maskPaintTypes: PaintType[]): string | null {
  if (!maskPaintTypes.length) return null;

  const doc = new DOMParser().parseFromString(templatedSvg, 'image/svg+xml');
  const root = doc.documentElement;
  if (!root || getTagName(root) !== 'svg') return null;

  const groups = collectGroups(root, maskPaintTypes);
  if (!groups.length) return null;

  return encodePlan(groups, maskPaintTypes);
}

/** 把挖除计划以 `data-cut` 属性注入到 SVG 根标签上（不改变其余任何结构） */
export function injectCutAttr(svgString: string, planAttr: string): string {
  return svgString.replace(/^<svg\b/, `<svg data-cut="${planAttr}"`);
}

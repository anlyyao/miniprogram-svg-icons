import { DOMParser } from 'xmldom';
import { PaintType, SvgElement, getElementChildren, getTagName, getPaintTypes } from './svgDomHelpers';

/**
 * 透明度重叠——运行时按需挖除方案（原型：仅微信平台）
 *
 * 与 `opacityOverlap.ts`（build 时静态注入 mask+use）不同，这里 build 时只产出一份
 * 极小的「挖除计划」（挖谁、挖除谁的区域），以 `data-cut` 属性挂在 `<svg>` 根节点上，
 * 不改变可见结构、不注入任何 `<mask>`/`<defs>`。真正的 mask 构建推迟到运行时——只有
 * 当用户传入的颜色确实带alpha（半透明）时才现算现用，否则零开销直接渲染原始 SVG。
 *
 * 计划基于「已完成颜色模板替换」的最终 SVG 字符串（而非 build 中间产物）计算，确保
 * 这里编号的下标与运行时（`utils.js.tpl`）实际解析到的兄弟结构严格一一对应。
 *
 * 格式：`gTypes:group(;group)*`，`group := path#types`。
 * - `gTypes`：本图标整体检测出确实存在几何重叠的 paint 类型，`f`/`s`/`fs` 之一
 *   （即 `detectOpacityOverlapPaintTypes` 的结果，全图共用一份，不按group 重复）。
 * - `path`：从根 `<svg>` 到该兄弟组容器的子节点下标链（用 `.` 连接，根的直接子节点组
 *   用空串）。
 * - `types`：该容器**每个**直接子节点对应一个字符，`f`/`s` 表示该子节点是单一 fill/
 *   stroke 图层，`.` 表示不是单一 paint 图层（占位，不参与挖除，但要保留位置以保证
 *   下标对齐）；结尾多余的 `.` 会被裁掉。
 *
 * 运行时挖除规则完全由 `types` 推导，不需要显式存储「谁挖谁」：对`types` 从后往前
 * 扫描，用一个累加数组收集「已经过的单一paint 节点」；每遇到一个自身类型命中
 * `gTypes` 且当前累加数组非空的位置，就用整个累加数组（即它之后所有单一paint 兄弟，
 * 不论fill/stroke）作为挖除对象，这与原 `at-upper` 显式列表语义完全等价——因为
 * upper 本来就总是「排在它之后的全部单一paint 兄弟」，无需为每个位置单独存一份。
 *
 * 例：`fs:0#ffss;0.2#ss` 表示：
 *   - 全图检测出 fill 和 stroke 都存在几何重叠；
 *   - svg 第0 个子节点（外层 <g>）内 4 个直接子节点依次是 fill/fill/stroke/stroke，
 *     其中第 0、1 个（fill）分别需挖除其后所有单一paint 兄弟覆盖的区域，第 2 个
 *     （stroke，作为分组自身只含stroke）需挖除第 3 个覆盖的区域；
 *   - 该外层 <g> 的第 2 个子节点（一个内部还有 2 条 stroke 子路径的分组）内，
 *     第 0 个子节点需挖除第 1 个覆盖的区域（同一分组内部的重叠，如 `tape.svg`）。
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

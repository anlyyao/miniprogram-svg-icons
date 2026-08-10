import { DOMParser, XMLSerializer } from 'xmldom';
import { getElementChildren, getTagName, isVisiblePaint, SvgElement } from './svgDomHelpers';

/**
 * 纯描边路径合并（借鉴 tdesign-icons `mergeAdjacentStrokePaths` 的思路）。
 *
 * 同一容器内相邻、描边样式完全相同、都不带fill 的两条路径，合并成一条复合路径后
 * 渲染器只会执行一次 stroke 绘制，不会出现重叠区 alpha 叠加，且比 mask 挖除更轻量。
 * 仅覆盖「同类型、同样式、相邻」场景，其余场景仍依赖 `opacityOverlap.ts`/
 * `opacityOverlapPlan.ts` 的通用 mask 兜底。
 *
 * 与 svgo `mergePaths` 插件的区别：svgo 在路径几何相交时会拒绝合并（该限制是为了
 * 照顾带 fill 的路径，合并后 fill-rule 绕数判定可能变化）。纯描边路径不存在这个
 * 风险，因此这里不做几何相交判断，比 svgo 更激进。
 *
 * 约束：这个函数只能在 `shared.ts` 里对 `optimizeSvg` 的输出调用一次，产出的字符串
 * 必须同时喂给检测（`detectOpacityOverlapPaintTypes`）与最终模板生成
 * （`svgTotemplate.ts`），保证两边读到的结构一致。
 */

const CONTAINER_SKIP_TAGS = new Set(['defs', 'mask', 'clippath', 'symbol']);

function getComparableAttrs(element: SvgElement) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Array.from(element.attributes || [])
    .map((attr: any) => [attr.name, attr.value])
    .filter(([name]) => !['d', 'id'].includes(name))
    .sort(([left], [right]) => left.localeCompare(right));
}

/** 是否可以把 current 合并进 previous：同为纯描边 path，样式（除 d/id）完全一致 */
function canMerge(previous: SvgElement, current: SvgElement): boolean {
  if (getTagName(previous) !== 'path' || getTagName(current) !== 'path') return false;
  if (!isVisiblePaint(previous.getAttribute('stroke'))) return false;
  if (previous.getAttribute('stroke') !== current.getAttribute('stroke')) return false;
  // fill 路径排除：拼接后子路径的绕数（winding）关系可能改变填充结果，不安全
  if (isVisiblePaint(previous.getAttribute('fill')) || isVisiblePaint(current.getAttribute('fill'))) return false;
  if (previous.getAttribute('id') !== current.getAttribute('id')) return false;
  return JSON.stringify(getComparableAttrs(previous)) === JSON.stringify(getComparableAttrs(current));
}

const SVG_NUMBER = '[-+]?(?:\\d*\\.\\d+|\\d+\\.?\\d*)(?:[eE][-+]?\\d+)?';
// 匹配路径开头的小写 `m`：命令字母 + 第一对坐标（moveto 目标点）
const LEADING_LOWER_MOVETO_RE = new RegExp(`^m\\s*(${SVG_NUMBER})[\\s,]*(${SVG_NUMBER})`);
// 紧跟在坐标对后面的裸数字（没有新的命令字母），即隐式重复的 moveto-as-lineto
const BARE_NUMBER_RE = new RegExp(`^[\\s,]*${SVG_NUMBER}`);

/**
 * 路径 `d` 的第一个 moveto 即使写成小写 `m` 也按绝对坐标处理；拼接到 previous 后面后
 * 它不再是首个命令，若不处理会被误解释为相对坐标，因此需换成 `M`。
 *
 * 若 moveto 后紧跟裸坐标对（隐式重复的 lineto，如 `m21 4.18-3-1.2v...` 里的
 * `-3-1.2`），其绝对/相对语义继承自 `m` 的大小写；直接换成 `M` 会让这些裸坐标被
 * 误当成绝对坐标，故需先插入 `l` 锁定相对语义，再替换 `m` 为 `M`。
 */
function normalizeLeadingMoveto(d: string): string {
  const trimmed = d.trim();
  const match = LEADING_LOWER_MOVETO_RE.exec(trimmed);
  if (!match) return trimmed;

  const rest = trimmed.slice(match[0].length);
  const hasImplicitRepeat = BARE_NUMBER_RE.test(rest);
  return `M${match[1]} ${match[2]}${hasImplicitRepeat ? 'l' : ''}${rest}`;
}

/** 递归合并 node 子树内，每个容器下相邻的同款纯描边 path */
function mergeContainer(node: SvgElement): void {
  if (CONTAINER_SKIP_TAGS.has(getTagName(node))) return;

  getElementChildren(node).forEach(mergeContainer);

  getElementChildren(node).reduce((previous: SvgElement | null, current: SvgElement) => {
    if (previous && canMerge(previous, current)) {
      const mergedD = `${previous.getAttribute('d') || ''} ${normalizeLeadingMoveto(current.getAttribute('d') || '')}`;
      previous.setAttribute('d', mergedD.trim());
      node.removeChild(current);
      return previous;
    }
    return current;
  }, null);
}

/**
 * 对（已 SVGO 优化的）SVG 字符串做纯描边路径合并，返回新的 SVG 字符串。
 * 解析失败或非<svg> 根节点时原样返回，不阻断构建。
 */
export function mergeAdjacentStrokeOnlyPaths(svgString: string): string {
  try {
    const doc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
    const root = doc.documentElement;
    if (!root || getTagName(root) !== 'svg') return svgString;

    mergeContainer(root);
    return new XMLSerializer().serializeToString(doc);
  } catch {
    return svgString;
  }
}

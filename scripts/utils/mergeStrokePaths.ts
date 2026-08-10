import { DOMParser, XMLSerializer } from 'xmldom';
import svgpath from 'svgpath';
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

/**
 * 把 current 的 `d` 拼到 previous 后面前，用 `svgpath` 把它整体转成绝对坐标
 * （`.abs()`）。绝对坐标命令不依赖"当前点"，不管它被拼接到哪条 subpath 之后，
 * 渲染结果都和它作为独立路径时完全一致——一次性规避了「首个 moveto 因为不再是
 * 整条合成路径的第一个命令而被误判为相对坐标」以及「moveto 后紧跟的隐式重复坐标
 * 对，其绝对/相对语义继承自moveto 大小写，直接改写命令字母会让它们被误读」这两类
 * 问题，不需要自己用正则解析 SVG 路径语法。
 *
 * `svgpath` 是 fontello 出品的零依赖小工具库（专用于 SVG 路径坐标变换），比自研的
 * 正则方案更不容易在路径语法的边界情况（科学计数法、无分隔负数、圆弧标志位不加
 * 分隔符等）上出错，且只在构建脚本里用到，不会进入发布产物。
 */
function toAbsoluteD(d: string): string {
  try {
    return svgpath(d).abs().toString();
  } catch {
    // 极少数无法解析的畸形 d：保持原样，交由 canMerge 之外的路径正常渲染
    return d;
  }
}

/** 递归合并 node 子树内，每个容器下相邻的同款纯描边 path */
function mergeContainer(node: SvgElement): void {
  if (CONTAINER_SKIP_TAGS.has(getTagName(node))) return;

  getElementChildren(node).forEach(mergeContainer);

  getElementChildren(node).reduce((previous: SvgElement | null, current: SvgElement) => {
    if (previous && canMerge(previous, current)) {
      const mergedD = `${previous.getAttribute('d') || ''} ${toAbsoluteD(current.getAttribute('d') || '')}`;
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

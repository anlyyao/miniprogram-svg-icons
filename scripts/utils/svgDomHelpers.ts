/**
 * SVG DOM（xmldom）遍历共享工具。
 *
 * `detectOpacityOverlap.ts` / `opacityOverlap.ts` / `opacityOverlapPlan.ts` 都基于同一套
 * xmldom 节点结构做「取子元素」「取标签名」「判断可见颜色」「收集单一paint 类型」这几类
 * 基础判断，此前三处各自维护一份完全相同的实现；统一抽取到这里，避免同一逻辑分散维护、
 * 未来修改时遗漏或产生细微行为差异（三处的判断结果必须严格一致，否则 build 时的检测/
 * 计划结果会与实际渲染时挖除的图层集合不匹配）。
 */

export type PaintType = 'fill' | 'stroke';
export const PAINT_TYPES: PaintType[] = ['fill', 'stroke'];

export const ELEMENT_NODE = 1;

export const DRAWABLE_TAGS = new Set(['circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SvgElement = any;

export function getElementChildren(node: SvgElement): SvgElement[] {
  return Array.from(node?.childNodes || []).filter((child: SvgElement) => child.nodeType === ELEMENT_NODE);
}

export function getTagName(node: SvgElement): string {
  return node?.tagName?.toLowerCase?.() || '';
}

export function isVisiblePaint(value: string | null | undefined): boolean {
  return Boolean(value) && !['none', 'transparent'].includes(value.trim().toLowerCase());
}

/** 递归收集节点子树内实际出现的 paint 类型（fill/stroke），用于判断是否为「单一 paint 图层」 */
export function getPaintTypes(node: SvgElement): PaintType[] {
  const found = new Set<PaintType>();

  const visit = (element: SvgElement) => {
    PAINT_TYPES.forEach((paintType) => {
      if (isVisiblePaint(element.getAttribute(paintType))) {
        found.add(paintType);
      }
    });
    getElementChildren(element).forEach(visit);
  };

  visit(node);
  return PAINT_TYPES.filter((paintType) => found.has(paintType));
}

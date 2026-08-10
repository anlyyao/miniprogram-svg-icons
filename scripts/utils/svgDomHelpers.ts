/**
 * SVG DOM（xmldom）遍历共享工具。
 *
 * `detectOpacityOverlap.ts` / `opacityOverlap.ts` / `opacityOverlapPlan.ts` 共用同一套
 * 「取子元素」「取标签名」「判断可见颜色」「收集单一 paint 类型」基础判断，统一抽取到
 * 这里避免多处实现产生细微差异。
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

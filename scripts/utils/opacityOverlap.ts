import { DOMParser, XMLSerializer } from 'xmldom';
import { detectOpacityOverlapPaintTypes, PaintType } from './detectOpacityOverlap';

/**
 * 透明度重叠 mask 挖除
 *
 * 小程序图标运行时可能传入半透明色（如 rgba/8位hex），当同一区域内有多个半透明
 * 图层叠加时，透明度会累加导致重叠区颜色变深，与设计稿不符。
 *
 * 解决思路（对齐 tdesign-icons）：对每个下层图层套一个 luminance mask，把它上方
 * 所有单一 paint 兄弟图层覆盖的区域「挖掉」，使任意像素最终只被一层绘制，从而
 * 消除 alpha 叠加。由于小程序产物是独立的 SVG data URI，mask 可直接静态内联，
 * 无需运行时配合。
 *
 * 处理在「原始（优化后）SVG 字符串」阶段进行，早于模板变量替换（{f1}/{s1}），
 * 此时颜色为真实占位色、绘制顺序完整，处理结果不影响后续的动态填色。
 */

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const ELEMENT_NODE = 1;
const PAINT_TYPES: PaintType[] = ['fill', 'stroke'];

const DRAWABLE_TAGS = new Set(['circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect']);

const CONTAINER_SKIP_TAGS = new Set(['defs', 'mask', 'clippath', 'symbol']);

// mask 形状不需要保留这些属性，否则挖除区域本身会带透明度或被mask 干扰，挖不干净
const MASK_IGNORED_ATTRS = new Set(['class', 'id', 'mask', 'opacity', 'fill-opacity', 'stroke-opacity', 'style']);

const OPACITY_ATTRS = ['opacity', 'fill-opacity', 'stroke-opacity'];

type SvgElement = any;

interface ViewBox {
  x: string;
  y: string;
  width: string;
  height: string;
}

function getElementChildren(node: SvgElement): SvgElement[] {
  return Array.from(node?.childNodes || []).filter((child: SvgElement) => child.nodeType === ELEMENT_NODE);
}

function getTagName(node: SvgElement): string {
  return node?.tagName?.toLowerCase?.() || '';
}

function isVisiblePaint(value: string | null) {
  return Boolean(value) && !['none', 'transparent'].includes(value.trim().toLowerCase());
}

function parseViewBox(viewBox: string | null): ViewBox {
  const values = viewBox?.trim().split(/[\s,]+/);
  if (values?.length === 4) {
    return { x: values[0], y: values[1], width: values[2], height: values[3] };
  }
  return { x: '0', y: '0', width: '24', height: '24' };
}

function getPaintTypes(node: SvgElement): PaintType[] {
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

/**
 * 把 upperNode 复制为 mask 形状：清除颜色/透明度等属性，几何形状按对应 paint
 * 类型填成纯黑（luminance mask 中黑色=挖除）。
 */
function makeMaskShape(doc: SvgElement, node: SvgElement, paintType: PaintType): SvgElement {
  const clone = node.cloneNode(true);

  const strip = (element: SvgElement) => {
    if (element.nodeType !== ELEMENT_NODE) return;

    const attrNames = Array.from(element.attributes || []).map((attr: any) => attr.name);
    attrNames.forEach((name) => {
      if (MASK_IGNORED_ATTRS.has(name)) {
        element.removeAttribute(name);
      }
    });

    if (DRAWABLE_TAGS.has(getTagName(element))) {
      element.setAttribute('fill', paintType === 'fill' && isVisiblePaint(node.getAttribute('fill')) ? '#000' : 'none');
      element.setAttribute(
        'stroke',
        paintType === 'stroke' && isVisiblePaint(node.getAttribute('stroke')) ? '#000' : 'none',
      );
    }

    getElementChildren(element).forEach(strip);
  };

  strip(clone);
  return clone;
}

function createMask(doc: SvgElement, id: string, upperNodes: SvgElement[], viewBox: ViewBox): SvgElement {
  const mask = doc.createElement('mask');
  mask.setAttribute('id', id);
  mask.setAttribute('maskUnits', 'userSpaceOnUse');
  mask.setAttribute('maskContentUnits', 'userSpaceOnUse');
  mask.setAttribute('mask-type', 'luminance');
  mask.setAttribute('x', viewBox.x);
  mask.setAttribute('y', viewBox.y);
  mask.setAttribute('width', viewBox.width);
  mask.setAttribute('height', viewBox.height);

  // 白色背景矩形：默认全部保留
  const rect = doc.createElement('rect');
  rect.setAttribute('x', viewBox.x);
  rect.setAttribute('y', viewBox.y);
  rect.setAttribute('width', viewBox.width);
  rect.setAttribute('height', viewBox.height);
  rect.setAttribute('fill', '#fff');
  mask.appendChild(rect);

  // 上层图层填黑：这些区域从下层挖除
  upperNodes.forEach((upperNode) => {
    mask.appendChild(makeMaskShape(doc, upperNode, getPaintTypes(upperNode)[0]));
  });

  return mask;
}

/**
 * 遍历同一父节点下的兄弟图层，对每个下层套mask 挖掉它上方所有单一paint 图层
 * （含fill/stroke 跨类型重叠）覆盖的区域。maskPaintTypes 限定只处理检测出确实
 * 重叠的 paint 类型，避免给无需处理的图层注入多余 mask。
 */
function applyMasks(doc: SvgElement, root: SvgElement, maskPaintTypes: PaintType[], viewBox: ViewBox): SvgElement[] {
  const masks: SvgElement[] = [];
  let maskIndex = 0;

  const visit = (node: SvgElement) => {
    if (CONTAINER_SKIP_TAGS.has(getTagName(node))) {
      return;
    }

    const children = getElementChildren(node);
    children.forEach(visit);

    children.forEach((child, childIndex) => {
      if (isVisiblePaint(child.getAttribute('mask'))) {
        return;
      }

      const paintTypes = getPaintTypes(child);
      if (paintTypes.length !== 1 || !maskPaintTypes.includes(paintTypes[0])) {
        return;
      }

      const upperNodes = children
        .slice(childIndex + 1)
        .filter((upperNode: SvgElement) => getPaintTypes(upperNode).length === 1);

      if (!upperNodes.length) {
        return;
      }

      const maskId = `overlap-mask-${maskIndex}`;
      maskIndex += 1;
      masks.push(createMask(doc, maskId, upperNodes, viewBox));
      child.setAttribute('mask', `url(#${maskId})`);
    });
  };

  visit(root);
  return masks;
}

/**
 * 对单个（优化后）SVG 字符串处理透明度重叠。若检测到重叠则注入 mask 并返回新的
 * SVG 字符串，否则原样返回。
 *
 * @param svgString 优化后的原始 SVG 字符串
 * @param cacheKey  用于检测结果缓存的唯一键（建议 `${brand}/${iconName}`）
 */
export function processOpacityOverlap(svgString: string, cacheKey: string): string {
  const paintTypes = detectOpacityOverlapPaintTypes(svgString, cacheKey);
  if (!paintTypes.length) {
    return svgString;
  }

  const doc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  const root = doc.documentElement;
  if (!root || getTagName(root) !== 'svg') {
    return svgString;
  }

  const viewBox = parseViewBox(root.getAttribute('viewBox'));
  const masks = applyMasks(doc, root, paintTypes, viewBox);
  if (!masks.length) {
    return svgString;
  }

  // 把 mask 定义放进<defs>（复用已有的或新建），置于最前
  let defs = getElementChildren(root).find((child: SvgElement) => getTagName(child) === 'defs');
  if (!defs) {
    defs = doc.createElement('defs');
    root.insertBefore(defs, root.firstChild);
  }
  masks.forEach((mask) => defs.appendChild(mask));

  return new XMLSerializer().serializeToString(doc);
}

export { OPACITY_ATTRS };

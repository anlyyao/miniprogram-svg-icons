import { Resvg } from '@resvg/resvg-js';
import { DOMParser, XMLSerializer } from 'xmldom';
import {
  PaintType,
  PAINT_TYPES,
  DRAWABLE_TAGS,
  SvgElement,
  getElementChildren,
  getTagName,
  isVisiblePaint,
  getPaintTypes,
} from './svgDomHelpers';

export type { PaintType };

/**
 * 透明度重叠检测（几何重叠版）
 *
 * 与桌面端（tdesign-icons）不同，小程序图标的颜色是运行时通过 {f1}/{f2}/{s1}
 * 动态注入的，源 SVG 中的 fill/stroke 只是不透明占位色（white/black）。因此
 * 编译期无法用「rgba(0,0,0,0.5) 采样alpha 叠加」判断，只能判断「图层几何是否
 * 重叠」——一旦用户运行时传入半透明色，这些几何重叠区就会出现透明度叠加变深。
 *
 * 检测原理：把每个候选图层单独用不透明黑重绘、其余隐藏，栅格化后取覆盖掩码
 * （alpha >阈值即视为被该层覆盖）。任意两层的覆盖掩码若有足够多的公共像素，
 * 则判定该图标存在重叠，需要在编译期注入 mask 挖除。
 */

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

// 这些标签只定义引用内容，不参与实际绘制，改色会破坏 mask/clip 的覆盖范围
const DEFINITION_TAGS = new Set([
  'clippath',
  'defs',
  'filter',
  'lineargradient',
  'marker',
  'mask',
  'pattern',
  'radialgradient',
  'symbol',
]);

const OPACITY_ATTRS = ['opacity', 'fill-opacity', 'stroke-opacity'];

// 用不透明黑重绘候选图层，被覆盖像素 alpha 接近 255，未覆盖为 0
const TEST_PAINT = '#000';
const RENDER_WIDTH = 96;
// alpha 高于该值即认为该像素被图层覆盖（滤掉边缘抗锯齿的低覆盖率像素）
const COVERAGE_ALPHA = 128;
// 两层公共覆盖像素数超过该值才判定为真实重叠（滤掉仅边缘相接的情况）
const MIN_OVERLAP_PIXELS = 12;

interface OverlapLayer {
  paintType: PaintType;
  paintedElements: Set<SvgElement>;
}

// 以「品牌/图标名」为 key，缓存检测结果，供多平台复用
const detectionCache = new Map<string, PaintType[]>();

function isDefinition(node: SvgElement) {
  return DEFINITION_TAGS.has(getTagName(node));
}

/**
 * 沿祖先链查找元素对某 paint 类型的有效取值：自身设了可见色则算覆盖，显式设为
 * none/transparent 则不覆盖；都没设时，fill 默认黑色（覆盖），stroke 默认不绘制。
 */
function hasEffectivePaint(element: SvgElement, paintType: PaintType) {
  let current = element;
  while (current?.getAttribute) {
    const value = current.getAttribute(paintType);
    if (isVisiblePaint(value)) {
      return true;
    }
    if (current.hasAttribute?.(paintType)) {
      return false;
    }
    current = current.parentNode;
  }
  return paintType === 'fill';
}

// 注：此前这里有一个 mergeStrokeLayers，会在检测前手动合并相邻同款描边路径，理由是
// “与 svgo mergePaths 保持一致”；但传入本模块的 svgString 已跑过 svgo，真正能合并的
// 路径此时已经合并好了。该手动合并未做 svgo mergePaths 内部的几何相交判断，会把 svgo
// 特意保留分开的相交路径（如 tape.svg 描边）误合并成一条，导致漏判重叠、运行时半透明色
// 下描边顶部透明度叠加变深，故直接删除，让检测忠实反映 optimizedContent 的真实结构。

/**
 * 引用了不存在的 clipPath/mask 时元素不会被绘制，检测前需要清掉这类失效引用，
 * 否则整张图都是空白，导致漏判。
 */
function dropDanglingReferences(elements: SvgElement[]) {
  const ids = new Set(elements.map((element) => element.getAttribute('id')).filter(Boolean));

  elements.forEach((element) => {
    ['clip-path', 'mask'].forEach((attribute) => {
      const reference = /^url\(#(.+)\)$/.exec(element.getAttribute(attribute) || '');
      if (reference && !ids.has(reference[1])) {
        element.removeAttribute(attribute);
      }
    });
  });
}

function collectPaintedElements(layer: SvgElement, paintType: PaintType) {
  const painted = new Set<SvgElement>();

  const visit = (element: SvgElement) => {
    if (DRAWABLE_TAGS.has(getTagName(element)) && hasEffectivePaint(element, paintType)) {
      painted.add(element);
    }
    getElementChildren(element).forEach(visit);
  };

  visit(layer);
  return painted;
}

/**
 * 收集同一父节点下按绘制顺序排列的单一paint 图层。fill 和 stroke 也可能互相
 * 重叠（例如 support），因此不能按 paint 类型拆开检测。
 */
function collectOverlapLayerGroups(root: SvgElement): OverlapLayer[][] {
  const groups: OverlapLayer[][] = [];

  const visit = (parent: SvgElement) => {
    const children = getElementChildren(parent).filter((child) => !isDefinition(child));
    children.forEach(visit);

    const layers = children.reduce<OverlapLayer[]>((result, child) => {
      const paintTypes = getPaintTypes(child);
      if (paintTypes.length === 1) {
        result.push({
          paintType: paintTypes[0],
          paintedElements: collectPaintedElements(child, paintTypes[0]),
        });
      }
      return result;
    }, []);

    if (layers.length > 1) {
      groups.push(layers);
    }
  };

  visit(root);
  return groups;
}

function applyTestPaint(elements: SvgElement[], painted: Set<SvgElement>, paintType: PaintType) {
  const otherPaintType = paintType === 'fill' ? 'stroke' : 'fill';

  elements.forEach((element) => {
    if (!DRAWABLE_TAGS.has(getTagName(element))) {
      return;
    }

    if (painted.has(element)) {
      element.setAttribute(paintType, TEST_PAINT);
      element.setAttribute(otherPaintType, 'none');
    } else {
      element.setAttribute('fill', 'none');
      element.setAttribute('stroke', 'none');
    }
  });
}

/** 栅格化后取每个像素的 alpha 通道 */
function renderAlpha(svgString: string) {
  const { pixels } = new Resvg(svgString, {
    fitTo: { mode: 'width', value: RENDER_WIDTH },
    // 图标不含文本，跳过系统字体扫描，否则每次栅格化都要百毫秒级开销
    font: { loadSystemFonts: false },
  }).render();

  const alpha = new Uint8Array(pixels.length / 4);
  for (let sourceIndex = 3, targetIndex = 0; sourceIndex < pixels.length; sourceIndex += 4, targetIndex += 1) {
    alpha[targetIndex] = pixels[sourceIndex];
  }
  return alpha;
}

/** 两层覆盖掩码的公共像素数超过阈值即判定为几何重叠 */
function hasGeometryOverlap(lowerAlpha: Uint8Array, upperAlpha: Uint8Array) {
  let overlapPixels = 0;
  for (let index = 0; index < lowerAlpha.length; index += 1) {
    if (lowerAlpha[index] >= COVERAGE_ALPHA && upperAlpha[index] >= COVERAGE_ALPHA) {
      overlapPixels += 1;
      if (overlapPixels >= MIN_OVERLAP_PIXELS) {
        return true;
      }
    }
  }
  return false;
}

function detectPaintTypes(svgString: string): PaintType[] {
  const xmlDoc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  const root = xmlDoc.documentElement;
  if (!root.getAttribute('xmlns')) {
    root.setAttribute('xmlns', SVG_NAMESPACE);
  }

  const allElements: SvgElement[] = [];
  const paintableElements: SvgElement[] = [];
  const collect = (element: SvgElement, insideDefinition: boolean) => {
    allElements.push(element);
    const definition = insideDefinition || isDefinition(element);
    if (!definition) {
      paintableElements.push(element);
    }
    getElementChildren(element).forEach((child) => collect(child, definition));
  };
  collect(root, false);

  // 清除失效的 clipPath/mask 引用，避免整图渲染空白导致漏判
  dropDanglingReferences(allElements);

  // 清除透明度属性，避免影响覆盖掩码判定（几何检测只关心是否被覆盖）
  paintableElements.forEach((element) => {
    OPACITY_ATTRS.forEach((attribute) => element.removeAttribute(attribute));
  });

  const layerGroups = collectOverlapLayerGroups(root);
  const serializer = new XMLSerializer();
  const alphaByLayer = new Map<OverlapLayer, Uint8Array>();
  const getLayerAlpha = (layer: OverlapLayer) => {
    const cached = alphaByLayer.get(layer);
    if (cached) return cached;

    applyTestPaint(paintableElements, layer.paintedElements, layer.paintType);
    const alpha = renderAlpha(serializer.serializeToString(xmlDoc));
    alphaByLayer.set(layer, alpha);
    return alpha;
  };
  const overlappedPaintTypes = new Set<PaintType>();

  layerGroups.forEach((layers) => {
    layers.forEach((lowerLayer, lowerIndex) => {
      if (overlappedPaintTypes.has(lowerLayer.paintType)) return;

      const lowerAlpha = getLayerAlpha(lowerLayer);
      const overlapsUpperLayer = layers
        .slice(lowerIndex + 1)
        .some((upperLayer) => hasGeometryOverlap(lowerAlpha, getLayerAlpha(upperLayer)));
      if (overlapsUpperLayer) {
        overlappedPaintTypes.add(lowerLayer.paintType);
      }
    });
  });

  return PAINT_TYPES.filter((paintType) => overlappedPaintTypes.has(paintType));
}

/**
 * 检测某图标存在几何重叠的 paint 类型。检测基于原始（优化后）SVG 字符串，结果
 * 以 cacheKey 缓存供多平台复用。检测失败时降级为「不处理」，不阻断构建。
 */
export function detectOpacityOverlapPaintTypes(svgString: string, cacheKey: string): PaintType[] {
  const cached = detectionCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  let paintTypes: PaintType[] = [];
  try {
    paintTypes = detectPaintTypes(svgString);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`  ⚠️  检测图标 ${cacheKey} 的透明度图层重叠失败，跳过 mask 处理: ${message}`);
    paintTypes = [];
  }

  detectionCache.set(cacheKey, paintTypes);
  return paintTypes;
}

export function getOpacityOverlapDetections() {
  return Array.from(detectionCache.entries())
    .filter(([, paintTypes]) => paintTypes.length)
    .map(([cacheKey, paintTypes]) => ({ cacheKey, paintTypes }))
    .sort((left, right) => left.cacheKey.localeCompare(right.cacheKey));
}

import { DOMParser, XMLSerializer } from 'xmldom';
import { detectOpacityOverlapPaintTypes } from './detectOpacityOverlap';
import {
  PaintType,
  DRAWABLE_TAGS,
  ELEMENT_NODE,
  SvgElement,
  getElementChildren,
  getTagName,
  isVisiblePaint,
  getPaintTypes,
} from './svgDomHelpers';

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
 *
 * 体积优化（核心思路，下方MaskShapeRegistry/buildMasksForGroup 均围绕它展开）：
 * mask 里的挖除形状不再用 cloneNode 把上层路径几何（d）整段复制进去——同一条路径
 * 会在多个下层的 mask 中被复制多份，导致产物体积暴涨。改为按「被多少个 mask 复用」
 * 区分：≥2 个 mask 用到的形状在 <defs> 中只定义一份并赋 id，各处以 <use> 引用；只被
 * 1 个 mask 用到的则直接内联，避免多余的 <use> 间接层。使任意路径几何全图最多存一份。
 */

const CONTAINER_SKIP_TAGS = new Set(['defs', 'mask', 'clippath', 'symbol']);

// mask 形状不需要保留这些属性，否则挖除区域本身会带透明度或被mask 干扰，挖不干净
const MASK_IGNORED_ATTRS = new Set(['class', 'id', 'mask', 'opacity', 'fill-opacity', 'stroke-opacity', 'style']);

interface ViewBox {
  x: string;
  y: string;
  width: string;
  height: string;
}

function parseViewBox(viewBox: string | null): ViewBox {
  const values = viewBox?.trim().split(/[\s,]+/);
  if (values?.length === 4) {
    return { x: values[0], y: values[1], width: values[2], height: values[3] };
  }
  return { x: '0', y: '0', width: '24', height: '24' };
}

/**
 * 把 upperNode 复制为「纯黑挖除形状」，供<mask> 内直接内联或注册进 <defs> 供 <use> 复用。
 *
 * 修复说明：paintType 由调用方基于 getPaintTypes(upperNode) 预先判定（此时已保证
 * upperNode 整个子树内只含唯一 paint 类型），因此直接按 paintType 统一涂黑，不应再
 * 逐层检查外层 node 自身的 fill/stroke 属性——此前的实现里，当 upperNode 是 <g> 分组
 * （自身没有 fill/stroke 属性，颜色在其子节点上）时，`node.getAttribute(...)` 恒为
 * null，导致分组内所有子节点被误判为不可见（fill/stroke 均设为 none），使该分组作为
 * 上层图层时挖除完全失效，重叠区仍会出现透明度叠加变深。
 */
function makeMaskShape(node: SvgElement, paintType: PaintType, id: string): SvgElement {
  const clone = node.cloneNode(true);

  const strip = (element: SvgElement, isRoot: boolean) => {
    if (element.nodeType !== ELEMENT_NODE) return;

    const attrNames = Array.from(element.attributes || []).map((attr: any) => attr.name);
    attrNames.forEach((name) => {
      if (MASK_IGNORED_ATTRS.has(name)) {
        element.removeAttribute(name);
      }
    });

    if (DRAWABLE_TAGS.has(getTagName(element))) {
      element.setAttribute('fill', paintType === 'fill' ? '#000' : 'none');
      element.setAttribute('stroke', paintType === 'stroke' ? '#000' : 'none');
    }

    // 仅在提供 id 时，为根节点写 id 供 <use> 引用；内联形状无需 id
    if (isRoot && id) {
      element.setAttribute('id', id);
    }

    getElementChildren(element).forEach((child: SvgElement) => strip(child, false));
  };

  strip(clone, true);
  return clone;
}

/** 共享定义池：管理白底 rect 与被 ≥2 个 mask 复用的挖除形状（见文件头体积优化说明） */
class MaskShapeRegistry {
  private readonly doc: SvgElement;
  readonly viewBox: ViewBox;
  private readonly definitions: SvgElement[] = [];
  private readonly shapeIdByNode = new Map<SvgElement, string>();
  private backgroundId = '';
  private shapeIndex = 0;

  constructor(doc: SvgElement, viewBox: ViewBox) {
    this.doc = doc;
    this.viewBox = viewBox;
  }

  /** 共享白底矩形（默认全部保留），全图只定义一次，各 mask 用 <use> 引用 */
  getBackgroundId(): string {
    if (!this.backgroundId) {
      this.backgroundId = 'overlap-bg';
      const rect = this.doc.createElement('rect');
      rect.setAttribute('id', this.backgroundId);
      rect.setAttribute('x', this.viewBox.x);
      rect.setAttribute('y', this.viewBox.y);
      rect.setAttribute('width', this.viewBox.width);
      rect.setAttribute('height', this.viewBox.height);
      rect.setAttribute('fill', '#fff');
      this.definitions.push(rect);
    }
    return this.backgroundId;
  }

  /** 把某上层图层的挖除形状注册进 <defs>（仅一次）并返回其 id，供多处 <use> 复用 */
  getSharedShapeId(node: SvgElement): string {
    const cached = this.shapeIdByNode.get(node);
    if (cached) return cached;

    const id = `overlap-shape-${this.shapeIndex}`;
    this.shapeIndex += 1;
    this.shapeIdByNode.set(node, id);
    this.definitions.push(makeMaskShape(node, getPaintTypes(node)[0], id));
    return id;
  }

  getDefinitions(): SvgElement[] {
    return this.definitions;
  }

  /**
   * 若全图最终只有 1 个 mask 引用共享白底（即整张图标只需 1 个 mask），则共享+`<use>`
   * 反而比直接内联 rect 多一层间接开销。此时从共享定义池中移除白底定义，交由调用方
   * 把对应 mask 内的 `<use>` 换成内联 rect。
   */
  hasSharedBackground(): boolean {
    return Boolean(this.backgroundId);
  }

  removeBackgroundDefinition(): void {
    const index = this.definitions.findIndex((def) => def.getAttribute?.('id') === this.backgroundId);
    if (index !== -1) {
      this.definitions.splice(index, 1);
    }
  }
}

function createUse(doc: SvgElement, refId: string): SvgElement {
  const use = doc.createElement('use');
  // 使用 xlink:href：小程序 <image> 内联 SVG data URI 时对 xlink 引用兼容性最稳。
  use.setAttribute('xlink:href', `#${refId}`);
  return use;
}

/**
 * 为一组兄弟图层生成 mask（共享/内联的取舍见文件头体积优化说明）。
 *
 * 正确性注意：mask 的 maskUnits 必须显式声明为 userSpaceOnUse（SVG 规范默认值是
 * objectBoundingBox，若省略会导致挖除区域被错误裁剪到目标元素自身包围盒，在多层
 * 图标上出现挖除错位）；maskContentUnits 默认即为 userSpaceOnUse 可以省略；
 * x/y/width/height 省略后按 userSpaceOnUse 语境默认取视口的 -10%~120%，足以覆盖
 * 图标可见区域，因此可以省略以压缩属性字节。
 */
function buildMasksForGroup(
  doc: SvgElement,
  siblings: SvgElement[],
  maskTargetIndexes: number[],
  registry: MaskShapeRegistry,
  groupId: number,
): { masks: SvgElement[]; maskIdByChildIndex: Map<number, string> } {
  const masks: SvgElement[] = [];
  const maskIdByChildIndex = new Map<number, string>();

  // 每个下层需要挖除的上层集合（其后所有单一 paint 兄弟）
  const upperByTarget = new Map<number, SvgElement[]>();
  const usageCount = new Map<SvgElement, number>();

  maskTargetIndexes.forEach((childIndex) => {
    const uppers = siblings
      .slice(childIndex + 1)
      .filter((upperNode: SvgElement) => getPaintTypes(upperNode).length === 1);
    upperByTarget.set(childIndex, uppers);
    uppers.forEach((u) => usageCount.set(u, (usageCount.get(u) || 0) + 1));
  });

  maskTargetIndexes.forEach((childIndex, order) => {
    const uppers = upperByTarget.get(childIndex) || [];
    const maskId = `overlap-mask-${groupId}-${order}`;
    const mask = doc.createElement('mask');
    mask.setAttribute('id', maskId);
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    mask.setAttribute('mask-type', 'luminance');
    mask.appendChild(createUse(doc, registry.getBackgroundId()));

    uppers.forEach((upperNode) => {
      if ((usageCount.get(upperNode) || 0) >= 2) {
        // 被多个 mask 复用：注册共享形状并 <use> 引用，避免 d 重复
        mask.appendChild(createUse(doc, registry.getSharedShapeId(upperNode)));
      } else {
        // 仅此 mask 使用：直接内联，省去 <use> 间接层
        mask.appendChild(makeMaskShape(upperNode, getPaintTypes(upperNode)[0], ''));
      }
    });

    masks.push(mask);
    maskIdByChildIndex.set(childIndex, maskId);
  });

  return { masks, maskIdByChildIndex };
}

/**
 * 遍历同一父节点下的兄弟图层，对每个下层套mask 挖掉它上方所有单一paint 图层
 * （含fill/stroke 跨类型重叠）覆盖的区域。maskPaintTypes 限定只处理检测出确实
 * 重叠的 paint 类型，避免给无需处理的图层注入多余 mask。
 */
function applyMasks(
  doc: SvgElement,
  root: SvgElement,
  maskPaintTypes: PaintType[],
  registry: MaskShapeRegistry,
): SvgElement[] {
  const collected: SvgElement[] = [];
  let groupId = 0;

  const visit = (node: SvgElement) => {
    if (CONTAINER_SKIP_TAGS.has(getTagName(node))) {
      return;
    }

    const children = getElementChildren(node);
    children.forEach(visit);

    const maskTargetIndexes: number[] = [];
    children.forEach((child, childIndex) => {
      if (isVisiblePaint(child.getAttribute('mask'))) return;

      const paintTypes = getPaintTypes(child);
      if (paintTypes.length !== 1 || !maskPaintTypes.includes(paintTypes[0])) return;

      const hasUpper = children
        .slice(childIndex + 1)
        .some((upperNode: SvgElement) => getPaintTypes(upperNode).length === 1);
      if (!hasUpper) return;

      maskTargetIndexes.push(childIndex);
    });

    if (!maskTargetIndexes.length) return;

    const { masks, maskIdByChildIndex } = buildMasksForGroup(doc, children, maskTargetIndexes, registry, groupId);
    groupId += 1;

    collected.push(...masks);
    maskTargetIndexes.forEach((childIndex) => {
      const maskId = maskIdByChildIndex.get(childIndex);
      if (maskId) {
        children[childIndex].setAttribute('mask', `url(#${maskId})`);
      }
    });
  };

  visit(root);
  return collected;
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
  const registry = new MaskShapeRegistry(doc, viewBox);
  const masks = applyMasks(doc, root, paintTypes, registry);
  if (!masks.length) {
    return svgString;
  }

  // 全图只有 1 个 mask 时，白底只被引用一次，且不可能存在被多处复用的共享形状
  // （usageCount 至少 2 才会走共享），因此把背景 use 换成内联 rect 后该mask 内已
  // 不含任何 <use>，无需再声明 xlink 命名空间，进一步省去每个 2层图标的固定字节。
  let needsXlink = true;
  if (masks.length === 1 && registry.hasSharedBackground()) {
    const bgUse = getElementChildren(masks[0])[0];
    if (bgUse && getTagName(bgUse) === 'use') {
      const rect = doc.createElement('rect');
      rect.setAttribute('x', viewBox.x);
      rect.setAttribute('y', viewBox.y);
      rect.setAttribute('width', viewBox.width);
      rect.setAttribute('height', viewBox.height);
      rect.setAttribute('fill', '#fff');
      masks[0].insertBefore(rect, bgUse);
      masks[0].removeChild(bgUse);
      registry.removeBackgroundDefinition();
      needsXlink = false;
    }
  }

  // <use> 引用需要 xlink 命名空间声明，缺失则补上
  if (needsXlink && !root.getAttribute('xmlns:xlink')) {
    root.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  }

  // 把共享挖除形状与 mask 定义都放进 <defs>（复用已有的或新建），置于最前。
  // 共享形状需先于 mask 定义，以便 mask 内的 <use> 能正确解析引用。
  let defs = getElementChildren(root).find((child: SvgElement) => getTagName(child) === 'defs');
  if (!defs) {
    defs = doc.createElement('defs');
    root.insertBefore(defs, root.firstChild);
  }
  registry.getDefinitions().forEach((definition) => defs.appendChild(definition));
  masks.forEach((mask) => defs.appendChild(mask));

  return new XMLSerializer().serializeToString(doc);
}

import { DOMParser } from 'xmldom';
import { specifiedIcons } from './const';

export interface SvgAttrs {
  [key: string]: string;
}

export interface SvgNode {
  $: SvgAttrs;
  children: Record<string, SvgNode[]>;
}

const CONTEXT_IDS = ['fill1', 'fill2', 'stroke1', 'stroke2'] as const;
const CONTEXT_ID_SET = new Set<string>(CONTEXT_IDS);

// 这些子树仅作定义/挖除用途（如透明度重叠 mask），其颜色是固定的 #000/#fff，
// 不能被 normalizeColor 替换成 {f1}/{s1} 等动态变量，需原样输出。
const RAW_OUTPUT_TAGS = new Set(['defs', 'mask', 'clippath', 'symbol']);

const SPECIFIED_ICONS_SET = new Set(specifiedIcons);

const domParser = new DOMParser();

function convertXmlNodeToObject(node: Element): SvgNode {
  const obj: SvgNode = { $: {}, children: {} };

  if (node.attributes) {
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      obj.$[attr.name] = attr.value;
    }
  }

  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i] as Element;
      if (child.nodeType !== 1) continue;

      const tag = child.nodeName.toLowerCase();
      (obj.children[tag] ??= []).push(convertXmlNodeToObject(child));
    }
  }

  return obj;
}

function getFillFallback(fill: string): string {
  return fill === 'black' || fill === '#000' || fill === '#000000' ? 'currentColor' : 'transparent';
}

function resolveFillVar(index: string, fallback: string): string {
  return `{f${index} || '${fallback}'}`;
}

function resolveStrokeVar(index: string): string {
  return `{s${index} || 'currentColor'}`;
}

function normalizeColor(attrs: SvgAttrs, isSpecified: boolean, parentId?: string): void {
  const id = attrs.id;

  if (attrs.fill && attrs.fill !== 'none') {
    const fallback = getFillFallback(attrs.fill);

    // 对齐桌面端逻辑：specifiedIcons 先将 fill 绑定到 strokeColor1
    if (isSpecified) {
      attrs.fill = `{s1 || '${fallback}'}`;
    }

    // 有明确 id 时，覆盖为对应的 fillColor
    if (id === 'fill1' || id === 'fill2') {
      attrs.fill = resolveFillVar(id.slice(-1), fallback);
    } else if (!id) {
      if (parentId === 'fill1' || parentId === 'fill2') {
        attrs.fill = resolveFillVar(parentId.slice(-1), fallback);
      } else if (!isSpecified) {
        // 非 specifiedIcons 且无 id 时，默认绑定到 fillColor1
        attrs.fill = resolveFillVar('1', fallback);
      }
      // isSpecified 且无 id 且无 fill 系 parentId 时，保留上面设置的 strokeColor1
    }
  }

  if (attrs.stroke && attrs.stroke !== 'none') {
    attrs['stroke-width'] = '{sw}';

    if (id === 'stroke1' || id === 'stroke2') {
      attrs.stroke = resolveStrokeVar(id.slice(-1));
    } else if (!id) {
      if (parentId === 's1' || parentId === 'stroke2') {
        attrs.stroke = resolveStrokeVar(parentId.slice(-1));
      } else {
        attrs.stroke = `{s1 || 'currentColor'}`;
      }
    }
  }
}

function buildAttrString(node: SvgNode, isSpecified: boolean, parentId?: string): string {
  if (!node?.$) return '';

  const attrs = { ...node.$ };
  normalizeColor(attrs, isSpecified, parentId);

  return Object.entries(attrs)
    .filter(([k]) => k !== 'id')
    .map(([k, v]) => ` ${k}="${v}"`)
    .join('');
}

/**
 * 原样序列化子树（保留 id、不做颜色归一化），用于 defs/mask 等定义类节点：
 * 其颜色固定为 #000/#fff，若被 normalizeColor 替换成动态变量会破坏 mask 挖除。
 */
function serializeRaw(node: SvgNode, tag: string): string {
  const attrs = Object.entries(node.$)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join('');

  const hasChildren = Object.keys(node.children).length > 0;
  if (!hasChildren) {
    return `<${tag}${attrs} />`;
  }

  let inner = '';
  for (const [childTag, children] of Object.entries(node.children)) {
    if (!children) continue;
    for (const child of children) {
      inner += serializeRaw(child, childTag);
    }
  }
  return `<${tag}${attrs}>${inner}</${tag}>`;
}

export function parseSvg(svgContent: string): SvgNode {
  const xmlDoc = domParser.parseFromString(svgContent, 'image/svg+xml');

  const errors = xmlDoc.getElementsByTagName('parsererror');
  if (errors.length > 0) {
    throw new Error(`Failed to parse SVG: ${errors[0].textContent}`);
  }

  const root = xmlDoc.documentElement;
  if (!root || root.tagName.toLowerCase() !== 'svg') {
    throw new Error('<svg> element not found.');
  }

  return convertXmlNodeToObject(root);
}

function generateChildrenTemplate(
  childrenMap: Record<string, SvgNode[]>,
  isSpecified: boolean,
  parentId?: string,
): string {
  let tpl = '';

  for (const [tag, children] of Object.entries(childrenMap)) {
    if (!children) continue;

    for (const node of children) {
      // defs/mask 等定义类子树原样输出，不做颜色归一化
      if (RAW_OUTPUT_TAGS.has(tag)) {
        tpl += serializeRaw(node, tag);
        continue;
      }

      const currentId = node.$.id;
      const contextId = CONTEXT_ID_SET.has(currentId) ? currentId : parentId;

      const hasChildren = Object.keys(node.children).length > 0;
      const attrs = buildAttrString(node, isSpecified, parentId);

      if (hasChildren) {
        tpl += `<${tag}${attrs}>${generateChildrenTemplate(node.children, isSpecified, contextId)}</${tag}>`;
      } else {
        tpl += `<${tag}${attrs} />`;
      }
    }
  }

  return tpl;
}

function buildSvgAttrString(data: SvgNode): string {
  return Object.entries(data.$)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join('');
}

export function generateSvg(data: SvgNode, iconName: string): string {
  const isSpecified = SPECIFIED_ICONS_SET.has(iconName);
  const svgAttrs = buildSvgAttrString(data);
  const inner = generateChildrenTemplate(data.children, isSpecified);
  return `<svg${svgAttrs}>${inner}</svg>`;
}

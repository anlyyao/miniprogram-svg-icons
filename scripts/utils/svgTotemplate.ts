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

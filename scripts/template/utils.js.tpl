// ======================== 透明度重叠：运行时按需挖除（原型） ========================
//
// build 时若检测到图层透明度几何重叠，只会在<svg> 根标签上挂一个极小的 data-cut
// 属性（挖除计划），不会注入任何 <mask>/<defs>，因此 icons.js 里绝大多数图标与
// 无重叠问题时一样干净。真正的 mask 构建推迟到这里：只有当用户传入的颜色确实带
// alpha（半透明）时才现算现用，否则直接短路返回，零开销。
//
// data-cut 格式：`gTypes:group(;group)*`，`group := path#types`。
// - gTypes：本图标整体检测出确实存在几何重叠的 paint 类型，'f'/'s'/'fs' 之一。
// - path：从根 <svg> 到该兄弟组容器的子节点下标链（用 '.' 连接，根的直接子节点组用
//   空串表示）。
// - types：该容器每个直接子节点对应一个字符，'f'/'s' 表示单一 fill/stroke 图层，
//   '.' 表示不参与挖除的占位（保持下标对齐）；结尾多余的 '.' 已在 build 时裁掉。
//
// 挖除关系完全由 types 字符串推导：某个位置若自身类型命中 gTypes，就需要挖掉它
// 之后所有单一 paint 兄弟（不论 fill/stroke）覆盖的区域——不需要显式存储「谁挖谁」。

const DRAWABLE_TAGS_SET = { circle: 1, ellipse: 1, line: 1, path: 1, polygon: 1, polyline: 1, rect: 1 };
const MASK_IGNORED_ATTRS_SET = { class: 1, id: 1, mask: 1, opacity: 1, 'fill-opacity': 1, 'stroke-opacity': 1, style: 1 };

// 轻量级 SVG 子集解析器：仅支持自闭合/开闭合标签、双引号属性，足以覆盖 build 产物的固定结构
function parseSvgTree(str) {
  const tagRe = /<([a-zA-Z][\w-]*)((?:\s+[^\s"'=/>]+(?:=(?:"[^"]*"))?)*)\s*(\/)?>|<\/([a-zA-Z][\w-]*)>/g;
  const attrRe = /([\w:-]+)="([^"]*)"/g;
  let root = null;
  const stack = [];
  let match;

  while ((match = tagRe.exec(str))) {
    const openTag = match[1];
    const attrStr = match[2];
    const selfClose = match[3];
    const closeTag = match[4];

    if (closeTag) {
      stack.pop();
      continue;
    }
    if (!openTag) continue;

    const attrs = {};
    const attrOrder = [];
    attrRe.lastIndex = 0;
    let am;
    while ((am = attrRe.exec(attrStr))) {
      if (!(am[1] in attrs)) attrOrder.push(am[1]);
      attrs[am[1]] = am[2];
    }

    const node = { tag: openTag, attrs, attrOrder, children: [] };
    if (stack.length) {
      stack[stack.length - 1].children.push(node);
    } else {
      root = node;
    }
    if (!selfClose) stack.push(node);
  }

  return root;
}

function serializeNode(node) {
  let attrStr = '';
  for (let i = 0; i < node.attrOrder.length; i++) {
    const key = node.attrOrder[i];
    attrStr += ` ${key}="${node.attrs[key]}"`;
  }
  if (!node.children.length) return `<${node.tag}${attrStr}/>`;
  let inner = '';
  for (let i = 0; i < node.children.length; i++) inner += serializeNode(node.children[i]);
  return `<${node.tag}${attrStr}>${inner}</${node.tag}>`;
}

function setAttr(node, key, value) {
  if (!(key in node.attrs)) node.attrOrder.push(key);
  node.attrs[key] = value;
}

// 判断颜色字符串是否带alpha<1（rgb()/hex 已在 hex2rgb 阶段归一化，只有 rgba() 需要关心）
function hasAlpha(color) {
  if (typeof color !== 'string') return false;
  const match = /rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)/.exec(color);
  return Boolean(match) && parseFloat(match[1]) < 1;
}

function anyAlpha(colors) {
  for (let i = 0; i < colors.length; i++) if (hasAlpha(colors[i])) return true;
  return false;
}

function cloneBlackened(node, paintType) {
  const attrs = {};
  const attrOrder = [];
  for (let i = 0; i < node.attrOrder.length; i++) {
    const key = node.attrOrder[i];
    if (MASK_IGNORED_ATTRS_SET[key]) continue;
    attrs[key] = node.attrs[key];
    attrOrder.push(key);
  }
  const clone = { tag: node.tag, attrs, attrOrder, children: [] };
  if (DRAWABLE_TAGS_SET[node.tag]) {
    setAttr(clone, 'fill', paintType === 'fill' ? '#000' : 'none');
    setAttr(clone, 'stroke', paintType === 'stroke' ? '#000' : 'none');
  }
  for (let i = 0; i < node.children.length; i++) clone.children.push(cloneBlackened(node.children[i], paintType));
  return clone;
}

/**
 * 对已完成颜色替换的最终 SVG 字符串，按需注入挖除 mask。
 * @param resolvedSvg 已把 {f1}/{s1}/{sw} 占位符替换为真实颜色的 SVG 字符串（根标签带 data-cut）
 * @param fillColors 用户传入的 fillColor 数组（用于判断是否需要挖除 fill 层）
 * @param strokeColors 用户传入的 strokeColor 数组
 */
function applyOverlapCutIfNeeded(resolvedSvg, fillColors, strokeColors) {
  const cutMatch = /\sdata-cut="([^"]*)"/.exec(resolvedSvg);
  if (!cutMatch) return resolvedSvg;

  const needsFill = anyAlpha(fillColors);
  const needsStroke = anyAlpha(strokeColors);

  // 去掉 data-cut 属性（无论是否真的需要挖除，都不应残留在最终产物里）
  const cleaned = resolvedSvg.replace(cutMatch[0], '');
  if (!needsFill && !needsStroke) return cleaned;

  const plan = cutMatch[1];
  const colonIdx = plan.indexOf(':');
  const gTypes = plan.slice(0, colonIdx);
  //全图检测出的重叠类型里，同时命中「本次真的传入了alpha 颜色」才需要现算 mask
  const fillEligible = needsFill && gTypes.indexOf('f') !== -1;
  const strokeEligible = needsStroke && gTypes.indexOf('s') !== -1;
  if (!fillEligible && !strokeEligible) return cleaned;

  const root = parseSvgTree(cleaned);
  if (!root) return cleaned;

  const resolveContainer = (path) => {
    let node = root;
    for (let i = 0; i < path.length; i++) {
      node = node && node.children[path[i]];
      if (!node) return null;
    }
    return node;
  };

  const masks = [];
  let maskIndex = 0;
  let used = false;

  const groupStrs = plan.slice(colonIdx + 1).split(';');
  for (let g = 0; g < groupStrs.length; g++) {
    const groupStr = groupStrs[g];
    const hashIdx = groupStr.indexOf('#');
    const pathStr = groupStr.slice(0, hashIdx);
    const types = groupStr.slice(hashIdx + 1);
    const path = pathStr ? pathStr.split('.').map(Number) : [];

    const container = resolveContainer(path);
    if (!container) continue;
    const children = container.children;

    // 从后往前扫描 types：upperAccum 累加「已经过的、当前位置之后的单一 paint 节点」，
    // 每个命中 gTypes 的位置直接用它作为挖除对象——这正是「挖掉其后所有单一paint
    // 兄弟」的语义，不需要预先存储具体下标列表。
    const upperAccum = [];
    for (let i = types.length - 1; i >= 0; i--) {
      const char = types[i];
      if (char !== 'f' && char !== 's') continue;

      const node = children[i];
      const paintType = char === 'f' ? 'fill' : 'stroke';
      const needsOwn = char === 'f' ? fillEligible : strokeEligible;

      if (node && needsOwn && upperAccum.length && !node.attrs.mask) {
        const maskId = `c${maskIndex}`;
        maskIndex += 1;

        const maskChildren = [
          {
            tag: 'rect',
            attrs: { x: '-10%', y: '-10%', width: '120%', height: '120%', fill: '#fff' },
            attrOrder: ['x', 'y', 'width', 'height', 'fill'],
            children: [],
          },
        ];
        for (let u = 0; u < upperAccum.length; u++) {
          maskChildren.push(cloneBlackened(upperAccum[u].node, upperAccum[u].paintType));
        }

        masks.push({
          tag: 'mask',
          attrs: { id: maskId, maskUnits: 'userSpaceOnUse', 'mask-type': 'luminance' },
          attrOrder: ['id', 'maskUnits', 'mask-type'],
          children: maskChildren,
        });
        setAttr(node, 'mask', `url(#${maskId})`);
        used = true;
      }

      if (node) upperAccum.push({ node, paintType });
    }
  }

  if (!used) return cleaned;

  root.children.unshift({ tag: 'defs', attrs: {}, attrOrder: [], children: masks });
  return serializeNode(root);
}

module.exports = {
  applyOverlapCutIfNeeded,
};

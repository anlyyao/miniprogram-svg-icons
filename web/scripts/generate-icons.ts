import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resourcesDir = path.resolve(__dirname, '../../resources');
const outputDir = path.resolve(__dirname, '../src/data');

interface BrandManifest {
  brand: string;
  count: number;
  icons: string[];
}

interface IconManifest {
  outline: BrandManifest[];
  filled: BrandManifest[];
}

/**
 * 处理 SVG 内容，将 stroke/fill 属性转换为 CSS 变量
 * 支持多色图标：stroke1, stroke2, fill1, fill2 等
 */
function processSvgContent(svgContent: string, iconName: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = doc.documentElement;

  // 获取 viewBox
  const viewBox = svgElement.getAttribute('viewBox') || '0 0 24 24';
  
  // 递归处理所有元素（对齐 tdesign-icons 的 traverseNodes 逻辑）
  const processElement = (element: Element, inheritedId?: string) => {
    if (!element || element.nodeType !== 1) return;
    
    const tagName = element.tagName?.toLowerCase?.() || '';
    
    // 如果是 <g> 节点且有 id，将 id 传递给子元素
    if (tagName === 'g' && element.getAttribute('id')) {
      const gId = element.getAttribute('id')!;
      const children = element.childNodes;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.nodeType === 1) {
          processElement(child as Element, gId);
        }
      }
      return;
    }
    
    // 获取元素的 id（优先使用自身 id，否则使用继承的 id）
    const nodeId = element.getAttribute('id') || inheritedId || '';
    
    // 使用与 tdesign-icons 相同的正则表达式：匹配以 stroke + 数字结尾
    if (/^.*?(stroke\d+)$/.test(nodeId)) {
      // 处理描边路径
      const strokeId = nodeId.replace(/^.*?(stroke\d+)$/, '$1');
      const strokeIndex = strokeId.replace('stroke', '');
      
      element.setAttribute('id', strokeId);
      
      if (element.hasAttribute('stroke')) {
        element.setAttribute('stroke', `var(--svg-stroke-color-${strokeIndex}, currentColor)`);
        if (element.hasAttribute('stroke-width')) {
          element.setAttribute('stroke-width', 'var(--svg-stroke-width, 2)');
        }
      } else if (element.hasAttribute('fill') && element.getAttribute('fill') !== 'none') {
        // stroke 元素上的 fill 属性也用 strokeColor
        element.setAttribute('fill', `var(--svg-stroke-color-${strokeIndex}, currentColor)`);
      }
    }
    // 使用与 tdesign-icons 相同的正则表达式：匹配以 fill + 数字结尾
    else if (/^.*?(fill\d+)$/.test(nodeId)) {
      // 处理填充路径
      const fillId = nodeId.replace(/^.*?(fill\d+)$/, '$1');
      const fillIndex = fillId.replace('fill', '');
      
      element.setAttribute('id', fillId);
      
      if (element.hasAttribute('fill') && element.getAttribute('fill') !== 'none') {
        // fill 元素使用 fillColor（不是 strokeColor）
        element.setAttribute('fill', `var(--svg-fill-color-${fillIndex}, transparent)`);
      }
    }
    // 没有匹配的 id，使用默认处理
    else {
      // 处理 stroke 属性
      if (element.hasAttribute('stroke') && element.getAttribute('stroke') !== 'none') {
        element.setAttribute('stroke', 'var(--svg-stroke-color-1, currentColor)');
      }
      
      // 处理 stroke-width 属性
      if (element.hasAttribute('stroke-width')) {
        element.setAttribute('stroke-width', 'var(--svg-stroke-width, 2)');
      }
      
      // 处理 fill 属性
      if (element.hasAttribute('fill') && element.getAttribute('fill') !== 'none') {
        const currentFill = element.getAttribute('fill');
        // 如果是白色填充，用 fill-color 变量（描边-填充模式下会显示填充色）
        if (currentFill === 'white' || currentFill === '#fff' || currentFill === '#ffffff') {
          element.setAttribute('fill', 'var(--svg-fill-color-1, transparent)');
        } else if (currentFill !== 'none') {
          // 其他颜色用 stroke-color 变量（因为可能是描边图标的主色）
          element.setAttribute('fill', 'var(--svg-stroke-color-1, currentColor)');
        }
      }
    }
    
    // 递归处理子元素（非 g 元素）
    if (tagName !== 'g') {
      const children = element.childNodes;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.nodeType === 1) {
          processElement(child as Element);
        }
      }
    }
  };
  
  // 处理 SVG 内部的所有元素
  const children = svgElement.childNodes;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.nodeType === 1) {
      processElement(child as Element);
    }
  }
  
  // 序列化回字符串
  const serializer = new XMLSerializer();
  let innerContent = '';
  for (let i = 0; i < svgElement.childNodes.length; i++) {
    innerContent += serializer.serializeToString(svgElement.childNodes[i]);
  }
  
  // 描边图标添加 fill="none"，防止默认填充（对齐 tdesign-icons）
  return `<symbol id="icon-${iconName}" viewBox="${viewBox}" fill="none">${innerContent}</symbol>`;
}

/**
 * 处理填充图标的 SVG 内容
 */
function processFilledSvgContent(svgContent: string, iconName: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = doc.documentElement;

  // 获取 viewBox
  const viewBox = svgElement.getAttribute('viewBox') || '0 0 24 24';
  
  // 递归处理所有元素
  const processElement = (element: Element) => {
    if (!element || element.nodeType !== 1) return;
    
    // 处理 fill 属性
    if (element.hasAttribute('fill') && element.getAttribute('fill') !== 'none') {
      element.setAttribute('fill', 'var(--svg-fill-color-1, currentColor)');
    }
    
    // 递归处理子元素
    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.nodeType === 1) {
        processElement(child as Element);
      }
    }
  };
  
  // 处理 SVG 内部的所有元素
  const children = svgElement.childNodes;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.nodeType === 1) {
      processElement(child as Element);
    }
  }
  
  // 序列化回字符串
  const serializer = new XMLSerializer();
  let innerContent = '';
  for (let i = 0; i < svgElement.childNodes.length; i++) {
    innerContent += serializer.serializeToString(svgElement.childNodes[i]);
  }
  
  return `<symbol id="icon-${iconName}" viewBox="${viewBox}">${innerContent}</symbol>`;
}

function generateIcons() {
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 获取所有品牌目录
  const brandDirs = fs.readdirSync(resourcesDir)
    .filter(name => {
      const fullPath = path.join(resourcesDir, name);
      return fs.statSync(fullPath).isDirectory();
    });

  const outlineManifest: BrandManifest[] = [];
  const filledManifest: BrandManifest[] = [];
  const outlineSymbols: string[] = [];
  const filledSymbols: string[] = [];

  let totalOutline = 0;
  let totalFilled = 0;

  // 处理每个品牌目录
  for (const brand of brandDirs) {
    const brandDir = path.join(resourcesDir, brand);
    const svgFiles = fs.readdirSync(brandDir)
      .filter(name => name.endsWith('.svg'));

    const outlineIcons: string[] = [];
    const filledIcons: string[] = [];

    for (const svgFile of svgFiles) {
      const iconName = svgFile.replace('.svg', '');
      const fullIconName = `${brand}-${iconName}`;
      const svgPath = path.join(brandDir, svgFile);
      const svgContent = fs.readFileSync(svgPath, 'utf-8');

      // 判断是填充图标还是描边图标
      // 以 -filled 结尾的是填充图标
      const isFilled = iconName.endsWith('-filled');

      if (isFilled) {
        filledIcons.push(iconName);
        const symbol = processFilledSvgContent(svgContent, fullIconName);
        filledSymbols.push(symbol);
        totalFilled++;
      } else {
        outlineIcons.push(iconName);
        const symbol = processSvgContent(svgContent, fullIconName);
        outlineSymbols.push(symbol);
        totalOutline++;
      }
    }

    // 按字母排序
    outlineIcons.sort();
    filledIcons.sort();

    if (outlineIcons.length > 0) {
      outlineManifest.push({
        brand,
        count: outlineIcons.length,
        icons: outlineIcons,
      });
    }

    if (filledIcons.length > 0) {
      filledManifest.push({
        brand,
        count: filledIcons.length,
        icons: filledIcons,
      });
    }
  }

  // 按品牌名排序
  outlineManifest.sort((a, b) => a.brand.localeCompare(b.brand));
  filledManifest.sort((a, b) => a.brand.localeCompare(b.brand));

  // 生成 icons.ts 清单文件
  const iconsContent = `// 自动生成的图标清单文件，请勿手动修改
// Generated at: ${new Date().toISOString()}

export interface BrandManifest {
  brand: string;
  count: number;
  icons: string[];
}

export interface IconManifest {
  outline: BrandManifest[];
  filled: BrandManifest[];
}

export const manifest: IconManifest = ${JSON.stringify({ outline: outlineManifest, filled: filledManifest }, null, 2)};

export const outlineCount = ${totalOutline};
export const filledCount = ${totalFilled};
export const totalCount = ${totalOutline + totalFilled};
`;

  fs.writeFileSync(path.join(outputDir, 'icons.ts'), iconsContent);

  // 生成 SVG Sprite（分别生成描边和填充两个 sprite）
  const outlineSpriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;visibility:hidden">
${outlineSymbols.join('\n')}
</svg>`;

  const filledSpriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;visibility:hidden">
${filledSymbols.join('\n')}
</svg>`;

  const svgSpriteContent = `// 自动生成的 SVG Sprite 文件，请勿手动修改
// Generated at: ${new Date().toISOString()}

export const outlineSvgSprite = \`${outlineSpriteContent}\`;

export const filledSvgSprite = \`${filledSpriteContent}\`;
`;

  fs.writeFileSync(path.join(outputDir, 'svg-sprite.ts'), svgSpriteContent);

  console.log('✅ 图标数据生成完成！');
  console.log(`   - 描边图标: ${totalOutline} 个`);
  console.log(`   - 填充图标: ${totalFilled} 个`);
  console.log(`   - 总计: ${totalOutline + totalFilled} 个`);
  console.log(`   - 品牌数量: ${brandDirs.length} 个`);
}

generateIcons();

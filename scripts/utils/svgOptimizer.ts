import { optimize, Config } from "svgo";

/**
 * SVGO 配置
 * 用于 SVG 预压缩，在 URL 编码之前优化 SVG 文件大小
 *
 * 核心要求：
 * 1. 保留 id 属性（颜色映射依赖 fill1, fill2, stroke1, stroke2 等）
 * 2. 移除 width、height 属性
 * 3. 最大化压缩效果
 */
const svgoConfig: Config = {
  multipass: true,
  plugins: [
    // 基础清理
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",
    "removeEmptyAttrs",
    "removeEmptyContainers",
    "removeEmptyText",
    "removeHiddenElems",
    "removeUselessStrokeAndFill",
    "removeUnusedNS",
    "cleanupNumericValues",
    "sortAttrs",
    "convertStyleToAttrs",
    "mergePaths",
    "convertPathData",
    "minifyStyles",
    "removeTitle",
    "removeDesc",
    "collapseGroups",
    // 移除 width 和 height 属性
    {
      name: "removeAttrs",
      params: {
        attrs: ["width", "height"],
      },
    },
    {
      name: "removeUnknownsAndDefaults",
      params: {
        keepDataAttrs: true,
        keepAriaAttrs: true,
        keepRoleAttr: true,
      },
    },
    {
      name: "convertShapeToPath",
      params: {
        convertArcs: true,
      },
    },
    {
      name: "convertColors",
      params: {
        shorthex: true,
        shortname: true,
        currentColor: false,
      },
    },
  ],
};

/**
 * 使用 SVGO 优化 SVG 内容
 *
 * @param svgContent - 原始 SVG 字符串
 * @param filename - 可选的文件名，用于调试信息
 * @returns 优化后的 SVG 字符串
 */
export function optimizeSvg(svgContent: string, filename?: string): string {
  const result = optimize(svgContent, {
    ...svgoConfig,
    path: filename,
  });

  return result.data;
}

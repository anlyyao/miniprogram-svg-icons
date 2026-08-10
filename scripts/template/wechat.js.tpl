const iconsMap = require("./icons");
const { applyOverlapCutIfNeeded } = require("./utils");

// ======================== 组件定义 ========================

Component({
  properties: {
    name: { type: String, value: '' },
    brand: { type: String, value: 'tdesign' },
    size: { type: null, value: 24 },
    strokeWidth: { type: Number, value: 2 },
    strokeColor: { type: null },
    fillColor: { type: null },
  },

  observers: {
    'name, brand, size, strokeWidth, strokeColor, fillColor'() {
      this.updateIcon();
    },
  },

  lifetimes: {
    attached() {
      this.updateIcon();
    },
  },

  methods: {
    updateIcon() {
      const { name, brand, size, strokeWidth, strokeColor, fillColor } = this.data;
      const iconsData = iconsMap[brand] || {};
      const svgContent = iconsData[name] || '';
      const s = typeof size === 'number' ? `${size}px` : size;
      const strokeColors = this.normalizeColor(strokeColor);
      const fillColors = this.normalizeColor(fillColor);
      const svg = this.buildSvg(svgContent, strokeWidth, strokeColors, fillColors);

      this.setData({
        rootStyle: `width: ${s}; height: ${s}`,
        svgDataUri: svg ? `data:image/svg+xml;charset=utf-8,${svg{{EXTRA_REPLACE}}.replace(/<|>|#/g, (m) => encodeURIComponent(m))}` : '',
      });
    },

    normalizeColor(color) {
      if (!color) return null;
      if (typeof color === 'string') return this.hex2rgb(color);
      return color.map((c) => this.hex2rgb(c));
    },

    // 归一化颜色为 SVG 可识别的形式，并保留透明度（alpha）。
    // 支持 #rgb / #rgba / #rrggbb / #rrggbbaa / rgb() / rgba() 及颜色关键字。
    hex2rgb(hex) {
      if (typeof hex !== 'string') return hex;
      if (hex[0] !== '#') return hex;

      let h = hex.slice(1);
      // 3/4 位简写补全为6/8 位
      if (h.length === 3 || h.length === 4) h = h.replace(/(.)/g, '$1$1');

      if (h.length !== 6 && h.length !== 8) return hex;

      const [r, g, b] = h.match(/../g).map((c) => parseInt(c, 16));
      if (h.length === 8) {
        const a = parseInt(h.slice(6, 8), 16) / 255;
        return `rgba(${r},${g},${b},${Math.round(a * 1000) / 1000})`;
      }
      return `rgb(${r},${g},${b})`;
    },

    buildSvg(svgContent, strokeWidth, strokeColors, fillColors) {
      if (!svgContent) return '';
      const fill = [].concat(fillColors || []);
      const stroke = [].concat(strokeColors || []);
      const resolved = svgContent
        .replace(/\{f(\d+)\s*\|\|\s*'([^']+)'\}/g, (_, i, d) => fill[i - 1] || d)
        .replace(/\{s(\d+)\s*\|\|\s*'([^']+)'\}/g, (_, i, d) => stroke[i - 1] || d)
        .replace(/\{sw\}/g, strokeWidth);

      // 编译期只在存在几何重叠的图标上挂了 data-cut 挖除计划（无该属性的图标直接
      // 原样返回，零开销）；只有用户传入的颜色确实带 alpha 时才现算现用注入 mask，
      // 避免重叠区透明度叠加变深，不透明色场景与无重叠问题时完全一致。
      return applyOverlapCutIfNeeded(resolved, fill, stroke);
    },
  },
});

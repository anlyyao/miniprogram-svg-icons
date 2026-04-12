const iconsMap = require("./icons");

Component({
  options: {
    pureDataPattern: /^_/,
  },

  properties: {
    name: {
      type: String,
      value: '',
    },
    brand: {
      type: String,
      value: 'tdesign',
    },
    size: { type: null, value: 24 },
    strokeWidth: { type: String, value: 2 },
    strokeColor: { type: null },
    fillColor: { type: null },
  },

  observers: {
    'name, brand'() {
      this.getSvgContent();
      this.init();
    },
    'strokeWidth,strokeColor,fillColor'() {
      this.init();
    },
    size(s) {
      this.updateRootStyle(s);
    },
  },

  data: {
    _strokeColors: '',
    _fillColors: '',
  },

  lifetimes: {
    attached() {
      this.getSvgContent();
      this.init();
    },
  },

  methods: {
    getSvgContent() {
      const { name, brand } = this.data;
      const iconsData = iconsMap[brand] || {};
      const svgContent = iconsData[name] || '';
      this.setData({ svgContent });
    },

    updateRootStyle(size) {
      const s = typeof size === 'number' ? `${size}px` : size;
      this.setData({ rootStyle: `width: ${s}; height: ${s}` });
    },

    init() {
      const { size, strokeWidth, strokeColor, fillColor, svgContent } = this.data;
      this.updateRootStyle(size);

      const _strokeColors = this.normalizeColor(strokeColor);
      const _fillColors = this.normalizeColor(fillColor);

      this.setData({
        _strokeColors,
        _fillColors,
        svgDataUri: this.getSvgDataUri(svgContent, strokeWidth, _strokeColors, _fillColors),
      });
    },

    normalizeColor(color) {
      if (!color) return null;
      if (typeof color === 'string') return this.hex2rgb(color);
      return color.map((c) => this.hex2rgb(c));
    },

    hex2rgb(hex) {
      if (hex.indexOf('#') !== 0) return hex;
      hex = hex.slice(1);
      if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
      const rgb = [];
      hex.replace(/../g, (c) => {
        rgb.push(parseInt(c, 16));
        return c;
      });
      return `rgb(${rgb.join(',')})`;
    },

    getSvg(svgContent, strokeWidth, strokeColors, fillColors) {
      if (!svgContent) return '';

      const fill = [].concat(fillColors || []);
      const stroke = [].concat(strokeColors || []);

      return svgContent
        .replace(/\{\{fillColor(\d+)\s*\|\|\s*'([^']+)'\}\}/g, (_, i, d) => fill[i - 1] || d)
        .replace(/\{\{strokeColor(\d+)\s*\|\|\s*'([^']+)'\}\}/g, (_, i, d) => stroke[i - 1] || d)
        .replace(/\{\{strokeWidth\}\}/g, strokeWidth);
    },

    getSvgDataUri(svgContent, strokeWidth, strokeColors, fillColors) {
      const svg = this.getSvg(svgContent, strokeWidth, strokeColors, fillColors);
      if (!svg) return '';
      return `data:image/svg+xml;charset=utf-8,${svg.replace(/<|>|#/g, (m) => encodeURIComponent(m))}`;
    },
  },
});

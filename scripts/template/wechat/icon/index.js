const iconsMap = require("./icons");

Component({
  properties: {
    name: { type: String, value: '' },
    brand: { type: String, value: 'tdesign' },
    size: { type: null, value: 24 },
    strokeWidth: { type: String, value: 2 },
    strokeColor: { type: null },
    fillColor: { type: null },
  },

  observers: {
    'name, brand, size, strokeWidth, strokeColor, fillColor'() {
      this._update();
    },
  },

  lifetimes: {
    attached() {
      this._update();
    },
  },

  methods: {
    _update() {
      const { name, brand, size, strokeWidth, strokeColor, fillColor } = this.data;
      const iconsData = iconsMap[brand] || {};
      const svgContent = iconsData[name] || '';
      const s = typeof size === 'number' ? `${size}px` : size;
      const strokeColors = this._normalizeColor(strokeColor);
      const fillColors = this._normalizeColor(fillColor);
      const svg = this._buildSvg(svgContent, strokeWidth, strokeColors, fillColors);

      this.setData({
        rootStyle: `width: ${s}; height: ${s}`,
        svgDataUri: svg ? `data:image/svg+xml;charset=utf-8,${svg.replace(/<|>|#/g, (m) => encodeURIComponent(m))}` : '',
      });
    },

    _normalizeColor(color) {
      if (!color) return null;
      if (typeof color === 'string') return this._hex2rgb(color);
      return color.map((c) => this._hex2rgb(c));
    },

    _hex2rgb(hex) {
      if (hex[0] !== '#') return hex;
      hex = hex.slice(1);
      if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
      const [r, g, b] = hex.match(/../g).map((c) => parseInt(c, 16));
      return `rgb(${r},${g},${b})`;
    },

    _buildSvg(svgContent, strokeWidth, strokeColors, fillColors) {
      if (!svgContent) return '';
      const fill = [].concat(fillColors || []);
      const stroke = [].concat(strokeColors || []);
      return svgContent
        .replace(/\{\{fillColor(\d+)\s*\|\|\s*'([^']+)'\}\}/g, (_, i, d) => fill[i - 1] || d)
        .replace(/\{\{strokeColor(\d+)\s*\|\|\s*'([^']+)'\}\}/g, (_, i, d) => stroke[i - 1] || d)
        .replace(/\{\{strokeWidth\}\}/g, strokeWidth);
    },
  },
});

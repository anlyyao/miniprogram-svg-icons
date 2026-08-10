const iconsMap = require("./icons");

Component({
  props: {
    name: '',
    brand: 'tdesign',
    size: 24,
    strokeWidth: 2,
    strokeColor: null,
    fillColor: null,
  },

  data: {
    rootStyle: '',
    svgDataUri: '',
  },

  didMount() {
    this.updateIcon();
  },

  didUpdate(prevProps) {
    if (
      prevProps.name !== this.props.name ||
      prevProps.brand !== this.props.brand ||
      prevProps.size !== this.props.size ||
      prevProps.strokeWidth !== this.props.strokeWidth ||
      prevProps.strokeColor !== this.props.strokeColor ||
      prevProps.fillColor !== this.props.fillColor
    ) {
      this.updateIcon();
    }
  },

  methods: {
    updateIcon() {
      const { name, brand, size, strokeWidth, strokeColor, fillColor } = this.props;
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
    // 编译期已对重叠图层注入 mask，使各层互不叠加，因此这里直接把 alpha 保留在
    // 各自颜色里即可正确渲染，重叠区不会出现透明度累加变深。
    hex2rgb(hex) {
      if (typeof hex !== 'string') return hex;
      if (hex[0] !== '#') return hex;

      let h = hex.slice(1);
      // 3/4 位简写补全为 6/8 位
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
      return svgContent
        .replace(/\{f(\d+)\s*\|\|\s*'([^']+)'\}/g, (_, i, d) => fill[i - 1] || d)
        .replace(/\{s(\d+)\s*\|\|\s*'([^']+)'\}/g, (_, i, d) => stroke[i - 1] || d)
        .replace(/\{sw\}/g, strokeWidth);
    },
  },
});

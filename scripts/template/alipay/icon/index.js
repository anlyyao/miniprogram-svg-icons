const iconsMap = require("./icons");

Component({
  props: {
    name: '',
    brand: 'tdesign',
    size: 24,
    strokeWidth: '2',
    strokeColor: null,
    fillColor: null,
  },

  data: {
    rootStyle: '',
    svgDataUri: '',
    _strokeColors: '',
    _fillColors: '',
  },

  didMount() {
    this.getSvgContent();
  },

  didUpdate(prevProps) {
    if (
      prevProps.name !== this.props.name ||
      prevProps.brand !== this.props.brand
    ) {
      this.getSvgContent();
    }
    if (
      prevProps.size !== this.props.size ||
      prevProps.strokeWidth !== this.props.strokeWidth ||
      prevProps.strokeColor !== this.props.strokeColor ||
      prevProps.fillColor !== this.props.fillColor
    ) {
      this.init();
    }
  },

  methods: {
    getSvgContent() {
      const { name, brand } = this.props;
      const iconsData = iconsMap[brand] || {};
      const svgContent = iconsData[name] || '';
      this.setData({ svgContent });
      this.init();
    },

    updateRootStyle(size) {
      var s = typeof size === 'number' ? size + 'px' : size;
      this.setData({ rootStyle: 'width: ' + s + '; height: ' + s });
    },

    init() {
      var size = this.props.size;
      var strokeWidth = this.props.strokeWidth;
      var strokeColor = this.props.strokeColor;
      var fillColor = this.props.fillColor;
      var svgContent = this.data.svgContent;

      this.updateRootStyle(size);

      var _strokeColors = this.normalizeColor(strokeColor);
      var _fillColors = this.normalizeColor(fillColor);

      this.setData({
        _strokeColors: _strokeColors,
        _fillColors: _fillColors,
        svgDataUri: this.getSvgDataUri(svgContent, strokeWidth, _strokeColors, _fillColors),
      });
    },

    normalizeColor(color) {
      if (!color) return null;
      if (typeof color === 'string') return this.hex2rgb(color);
      return color.map(function (c) { return this.hex2rgb(c); }.bind(this));
    },

    hex2rgb(hex) {
      if (hex.indexOf('#') !== 0) return hex;
      hex = hex.slice(1);
      if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
      var rgb = [];
      hex.replace(/../g, function (c) {
        rgb.push(parseInt(c, 16));
        return c;
      });
      return 'rgb(' + rgb.join(',') + ')';
    },

    getSvg(svgContent, strokeWidth, strokeColors, fillColors) {
      if (!svgContent) return '';

      var fill = [].concat(fillColors || []);
      var stroke = [].concat(strokeColors || []);

      return svgContent
        .replace(/\{\{fillColor(\d+)\s*\|\|\s*'([^']+)'\}\}/g, function (_, i, d) { return fill[i - 1] || d; })
        .replace(/\{\{strokeColor(\d+)\s*\|\|\s*'([^']+)'\}\}/g, function (_, i, d) { return stroke[i - 1] || d; })
        .replace(/\{\{strokeWidth\}\}/g, strokeWidth);
    },

    getSvgDataUri(svgContent, strokeWidth, strokeColors, fillColors) {
      var svg = this.getSvg(svgContent, strokeWidth, strokeColors, fillColors);
      if (!svg) return '';
      return 'data:image/svg+xml;charset=utf-8,' + svg.replace(/<|>|#/g, function (m) { return encodeURIComponent(m); });
    },
  },
});

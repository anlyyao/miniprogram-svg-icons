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
  },

  didMount() {
    this._update();
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
      this._update();
    }
  },

  methods: {
    _update() {
      var name = this.props.name;
      var brand = this.props.brand;
      var size = this.props.size;
      var strokeWidth = this.props.strokeWidth;
      var strokeColor = this.props.strokeColor;
      var fillColor = this.props.fillColor;

      var iconsData = iconsMap[brand] || {};
      var svgContent = iconsData[name] || '';
      var s = typeof size === 'number' ? size + 'px' : size;
      var strokeColors = this._normalizeColor(strokeColor);
      var fillColors = this._normalizeColor(fillColor);
      var svg = this._buildSvg(svgContent, strokeWidth, strokeColors, fillColors);

      this.setData({
        rootStyle: 'width: ' + s + '; height: ' + s,
        svgDataUri: svg ? 'data:image/svg+xml;charset=utf-8,' + svg.replace(/<|>|#/g, function (m) { return encodeURIComponent(m); }) : '',
      });
    },

    _normalizeColor(color) {
      if (!color) return null;
      if (typeof color === 'string') return this._hex2rgb(color);
      return color.map(function (c) { return this._hex2rgb(c); }.bind(this));
    },

    _hex2rgb(hex) {
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

    _buildSvg(svgContent, strokeWidth, strokeColors, fillColors) {
      if (!svgContent) return '';
      var fill = [].concat(fillColors || []);
      var stroke = [].concat(strokeColors || []);
      return svgContent
        .replace(/\{\{fillColor(\d+)\s*\|\|\s*'([^']+)'\}\}/g, function (_, i, d) { return fill[i - 1] || d; })
        .replace(/\{\{strokeColor(\d+)\s*\|\|\s*'([^']+)'\}\}/g, function (_, i, d) { return stroke[i - 1] || d; })
        .replace(/\{\{strokeWidth\}\}/g, strokeWidth);
    },
  },
});

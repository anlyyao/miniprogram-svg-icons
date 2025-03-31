const useIcon = require("../common/use-icon");

// 品牌图标数据映射（构建时自动生成）
const iconsMap = {
  /* __ICONS_MAP_PLACEHOLDER__ */
};

Component({
  mixins: [useIcon],
  props: {
    name: {
      type: String,
      value: '',
    },
    brand: {
      type: String,
      value: 'tdesign',
    },
  },
  didMount() {
    this.getSvgContent();
  },
  didUpdate(prevProps) {
    if (prevProps.name !== this.props.name || prevProps.brand !== this.props.brand) {
      this.getSvgContent();
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
  },
});

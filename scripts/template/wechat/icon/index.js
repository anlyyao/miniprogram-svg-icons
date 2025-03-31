const useIcon = require("../common/use-icon");

const iconsMap = {
  /* __ICONS_MAP_PLACEHOLDER__ */
};

Component({
  behaviors: [useIcon],
  properties: {
    name: {
      type: String,
      value: '',
    },
    brand: {
      type: String,
      value: 'tdesign',
    },
  },
  observers: {
    'name, brand'() {
      this.getSvgContent();
      this.init();
    },
  },
  lifetimes: {
    attached() {
      this.getSvgContent();
    },
  },

  methods: {
    getSvgContent() {
      const { name, brand } = this.data;
      const iconsData = iconsMap[brand] || {};
      const svgContent = iconsData[name] || '';
      this.setData({ svgContent });
    },
  },
});

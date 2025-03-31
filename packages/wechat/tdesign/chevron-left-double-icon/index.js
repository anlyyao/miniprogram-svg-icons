var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M10.5 7.5L6 12L10.5 16.5M17 7.5L12.5 12L17 16.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

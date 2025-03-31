var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 10L22 20L2 20L2 7.5L9 7.5L11 10L18 10L22 10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 10V20L2 20L2 7.5H9L11 10H22Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 6L13 6L11 3.5L2 3.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

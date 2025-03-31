var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4L22 20L2 20L2 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M18 4L14 4L14 9.5L16 8L18 9.5L18 4Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M6 12H10M6 16H18M14 4L18 4V9.5L16 8L14 9.5L14 4Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 4V20L2 20L2 4L22 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

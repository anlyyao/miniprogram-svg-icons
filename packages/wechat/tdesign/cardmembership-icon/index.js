var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4L22 20L2 20L2 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 10L18 10L18 16L15.5 14.5L13 16L13 10Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M13 10L18 10L18 16L15.5 14.5L13 16L13 10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 10L2 10M22 10V4L2 4L2 10M22 10V20L2 20L2 10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

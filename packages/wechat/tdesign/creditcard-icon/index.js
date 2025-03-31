var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 10V20H2L2 10L22 10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 4H2V10H22V4Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 4L2 4M22 4V20H2L2 4M22 4V10H2L2 4" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 15L6 15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

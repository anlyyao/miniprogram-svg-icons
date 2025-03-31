var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 10L22 21L2 21L2 10L22 10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 6.5L4 6.5M18 3L6 3M22 10V21L2 21L2 10L22 10Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

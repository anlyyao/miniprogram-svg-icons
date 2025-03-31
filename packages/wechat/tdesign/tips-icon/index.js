var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 3L22 18L15 18L12 21L9 18L2 18L2 3L22 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 3L22 18L15 18L12 21L9 18L2 18L2 3L22 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

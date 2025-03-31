var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 20L22 20L22 9L2 9L2 20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 9L22 9L22 4L2 4L2 9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 9H22M2 9L2 4L22 4V9M2 9L2 20H22V9" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 16L6 13" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

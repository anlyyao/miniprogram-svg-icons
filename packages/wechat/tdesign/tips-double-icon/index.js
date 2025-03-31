var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 6L22 19L16.5 19L13.5 22L10.5 19L5 19L5 6L22 6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 6L22 19L16.5 19L13.5 22L10.5 19L5 19L5 6L22 6Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18 2.5L1.5 2.5L1.5 14.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

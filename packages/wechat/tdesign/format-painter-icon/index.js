var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><rect x="10" y="16" width="4" height="5" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 3H19V6.5V10H4V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M19 6.5V3H4V10H19V6.5ZM19 6.5H22V13H12V15" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10 16H12H14V21H10V16Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

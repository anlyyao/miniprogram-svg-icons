var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 3H3V10.5H21V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 21H21V10.5H3V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 10.5V21H21V10.5M3 10.5H21M3 10.5V3H21V10.5M17 7H11M7 7H6.99609V7.00391" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

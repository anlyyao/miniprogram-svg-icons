var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 10.5V5.5H3V10.5H21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 21.5L21 21.5V10.5L3 10.5L3 21.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7 18H15M7 14H11" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 10.5V21.5H3V10.5M21 10.5H3M21 10.5V5.5H3V10.5M7 5.5V2.5M17 5.5V2.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

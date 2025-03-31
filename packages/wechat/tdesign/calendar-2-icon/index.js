var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21L21 21V10L3 10L3 21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 10V5L3 5L3 10L21 10Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 10V5H3V10M21 10H3M21 10V21H3V10M7 5V2M17 5V2" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15.4997 13.25L11.2571 17.4926L9.13574 15.3713" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

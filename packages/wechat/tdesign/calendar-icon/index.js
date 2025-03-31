var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 10H3V21H21V10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 10H3V5H21V10Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 10H21M3 10V5H21V10M3 10V21H21V10M7 5V1.5M17 5V1.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

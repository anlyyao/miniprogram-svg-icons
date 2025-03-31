var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 21V10L3 10L3 21L21 21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3L3 3L3 10L12 10L21 10V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 10V21H3V10M21 10H3M21 10V3H3V10M21 10H12M3 10H12M12 10V21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

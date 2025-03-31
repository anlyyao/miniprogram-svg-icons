var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 21V10H19V21H5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5 10L12 3L19 10H12H5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5 10L12 3L19 10M5 10V21M5 10H4M5 10H12M19 10V21M19 10H12M19 10H20M5 21H3M5 21H12M19 21H21M19 21H12M12 10V21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18.0002 21L9.99902 16.5V7.5L18.0002 3V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6 16.5L6 7.5H9.99882L9.99882 16.5L6 16.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9.99882 16.5L6 16.5L6 7.5H9.99882M9.99882 16.5L18 21V3L9.99882 7.5M9.99882 16.5L9.99882 7.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

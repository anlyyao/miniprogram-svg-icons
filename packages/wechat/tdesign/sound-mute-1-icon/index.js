var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.0002 21L5.99902 16.5V7.5L14.0002 3V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 16.5L2 7.5H5.99882L5.99882 16.5L2 16.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5.99882 16.5L2 16.5L2 7.5H5.99882M5.99882 16.5L14 21V3L5.99882 7.5M5.99882 16.5L5.99882 7.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22.1215 9.87891L20.0002 12.0002M20.0002 12.0002L17.8789 14.1215M20.0002 12.0002L17.8789 9.87891M20.0002 12.0002L22.1215 14.1215" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

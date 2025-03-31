var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5.02184 8.32617C6.42977 11.0549 8.5996 13.3267 11.25 14.8598M7.5 5.5V3M7.5 5.5H12M7.5 5.5H3M3.5 14.8594C6.87215 12.9081 9.46658 9.7616 10.7031 6" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 21L16.5 11.5L12 21M19.55 19H13.45" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

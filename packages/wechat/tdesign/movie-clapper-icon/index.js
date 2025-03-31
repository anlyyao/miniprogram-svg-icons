var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 9L21 9L21 21L3 21C3 17 3 13 3 9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 3L21 3V9L3 9C3 7 3 5 3 3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 3H21M3 3C3 9 3 15 3 21H21V3M3 3C3 5 3 7 3 9H21V3M6.41667 3.5L10.5833 8.5M13.4167 3.5L17.5833 8.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M10 13H14" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

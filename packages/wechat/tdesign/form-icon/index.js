var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 8H21V21L3 21V8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 3H21V8H3V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 8H3M21 8V21L3 21V8M21 8V3H3V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 12.5L7 12.5M7 16.5L13 16.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

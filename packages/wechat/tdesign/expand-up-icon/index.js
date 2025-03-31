var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21H21V8H3V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3H3V8H21V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 8V21H21V8M3 8H21M3 8V3H21V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 13.5L10 15.5H14L12 13.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

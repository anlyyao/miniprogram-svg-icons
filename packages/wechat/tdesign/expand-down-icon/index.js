var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 3H3V16H21V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 21H21V16H3V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 16V3H21V16M3 16H21M3 16V21H21V16" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 10.5L10 8.5H14L12 10.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

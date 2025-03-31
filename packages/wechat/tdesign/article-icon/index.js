var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3.5 2.5L20.5 2.5L20.5 21.5L3.5 21.5L3.5 2.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3.5 2.5L20.5 2.5L20.5 21.5L3.5 21.5L3.5 2.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 8H16M8 12H16M8 16H13" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 17V3H4V17H20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 10L11 11.5V8.5L13 10Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 3H21M11.5 17.5L7 22M12.5 17.5L17 22M20 3V17H4V3H20Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M13 10L11 11.5V8.5L13 10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

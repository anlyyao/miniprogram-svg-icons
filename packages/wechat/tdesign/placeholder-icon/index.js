var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H21V21H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12.5 3.5L3.5 12.5M11.5 20.5L20.5 11.5M20.5 3.5L3.5 20.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 3H21V21H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M3.5 12.5L12.5 3.5H20.5L3.5 20.5V12.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M20.5 11.5L11.5 20.5H20.5V11.5Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

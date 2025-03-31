var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 21V8H8V21H16Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21V17M11 12H13" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 21H3V3H8V21ZM8 21V8H16V21M8 21H16M16 21H21V3H16V21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M3 21H8V3H3V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 21V3H16V21H21Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

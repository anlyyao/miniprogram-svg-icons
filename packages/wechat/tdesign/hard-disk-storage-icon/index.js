var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H21V21H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16.5 10.875V3H7.5V10.875H16.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M13 7V8M16.5 3V10.875H7.5V3H16.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 3H21V21H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

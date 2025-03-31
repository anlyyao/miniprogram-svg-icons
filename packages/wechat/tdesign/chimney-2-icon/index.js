var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 21V11H9V21H21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 21H9V11H10.4615L10 8V3H5V8L3 21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 17V21M9 21H3L5 8V3H10V8L10.4615 11H9V21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 21V11H9V21H21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

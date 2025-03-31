var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M18 3H6V8H18V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M18 16H6V21H18V16Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M18 3H6V8H18V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M18 16H6V21H18V16Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g><path d="M3 12L21 12" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M10 12H3V21H10V12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 3H21V12H14V3Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M10 3H3V8H10V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 16H14V21H21V16Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M10 12H3V21H10V12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14 3H21V12H14V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><g><path d="M10 3H3V8H10V3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 16H14V21H21V16Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

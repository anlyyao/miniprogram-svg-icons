var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.5005 8L1.50049 8L1.50049 17H6.00049L6.00049 15L18.0005 15V17L22.5005 17V8Z" fill="{{fillColor1 || 'transparent'}}" /><g><path d="M19.0005 3V8L5.00049 8L5.00049 3L19.0005 3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M18.0005 15V21L6.00049 21L6.00049 15H18.0005Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M19.0005 3V8L5.00049 8L5.00049 3L19.0005 3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18.0005 15V21L6.00049 21V15H18.0005Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><g><path d="M18.0005 11.5H18.0044V11.4961H18.0005V11.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22.5005 8H1.50049V17H6.00049V15H18.0005V17H22.5005V8Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

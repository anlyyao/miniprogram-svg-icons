var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17 3H7V8.55556L3 9V21H21V7L17 7.44444V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M17 21V14H21V21H17Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M17 6.92V3H7V7.9M3 9V21H21V7L3 9Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M11 11.998H11.0039V12.002H11V11.998Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 11.998H7.00391V12.002H7V11.998Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 11.998H7.00391V12.002H7V11.998Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 21V14H21V21H17Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

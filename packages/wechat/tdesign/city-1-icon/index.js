var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11 11H21V21H3V3H11V11Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 21V16H17V21H21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7.00391 7V7.00391H7M7.00391 12V12.0039H7M7.00391 17V17.0039H7M21 16V21H17V16H21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M11 21H3V3H11V11M11 21V11M11 21H21V11H11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

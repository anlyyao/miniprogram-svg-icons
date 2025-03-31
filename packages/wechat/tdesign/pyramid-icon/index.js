var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11 21L16.5 11L22 21H11Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11 21H2L11 5L15.4494 12.9101L11 21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M11 21H2L7.0625 12M11 21L13.75 16L15.4494 12.9101L14.9375 12M11 21V12M7.0625 12L11 5L14.9375 12M7.0625 12H11M14.9375 12H11" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M13.75 16L11 21H16.5M13.75 16H16.5M13.75 16L16.5 11L19.25 16M19.25 16L22 21H16.5M19.25 16H16.5M16.5 16V21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

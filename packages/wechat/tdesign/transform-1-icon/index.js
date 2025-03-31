var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M21 7H17V3H21V7Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7 7H3L3.00001 3H7V7Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 21H17V17H21V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7 21H3V17H7V21Z" fill="{{fillColor2 || 'transparent'}}" /></g><path d="M5 17V7M5 17H3V21H7V19M5 17H7V19M5 7L3 7L3.00001 3H7V5M5 7L7 7V5M7 5H17M17 5L17 7L19 7M17 5L17 3H21V7L19 7M19 7V17M19 17H17L17 19M19 17H21V21H17L17 19M17 19H7" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

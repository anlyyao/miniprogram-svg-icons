var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7 3L7 21H17L17 3L7 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7 3V21M17 3V21M3 7H7M3 17H7M21 7H17M21 17H17M3 12H21M3 21V3H21V21H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

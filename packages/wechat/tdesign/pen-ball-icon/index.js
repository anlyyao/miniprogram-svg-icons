var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.5 5L19 9.5L7.5 21L3.00049 21.0006L3.00049 16.5L14.5 5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M17 2.5L21.5 7M14.5 5L19 9.5L7.5 21L3.00049 21.0006L3.00049 16.5L14.5 5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21.5 12L15.5 18" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

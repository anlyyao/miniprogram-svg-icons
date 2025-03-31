var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 5H18V22L11 17L4 22V5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 5H18V22L11 17L4 22V5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M11.001 1.00195L18.501 1.00195L22 1.00098V12.501V15.001M22 15.001V16.001L22.001 16.002L22 15.001Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

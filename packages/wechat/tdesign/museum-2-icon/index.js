var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21V5L6 3L9 5V12L21 10V21H17V17H13V21H9H3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 21V5L6 3L9 5V12L21 10V21H17V17H13V21H9H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

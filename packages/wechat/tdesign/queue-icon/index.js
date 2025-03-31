var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 7H17V21H3V7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6.5 14H10M10 14H13.5M10 14V17.5M10 14V10.5M3 7H17V21H3V7Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8.00098 3.00195L21 3.00098V17.001M21 17.001V18.001L21.001 18.002L21 17.001Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

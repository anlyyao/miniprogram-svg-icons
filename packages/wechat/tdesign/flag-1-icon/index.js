var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 14H11L13 16H20L18 10.5H13L11 8.5H4V14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 10.5H18L20 5H13L11 3H4V8.5H11L13 10.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 3H11L13 5H20L18 10.5M4 3V14M4 3V8.5H11L13 10.5H18M4 14H11L13 16H20L18 10.5M4 14V21.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 3H11L13 5H20L18 10.5L20 16H13L11 14H4V8.5V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 14H11L13 16H20L18 10.5L20 5H13L11 3H4V8.5V14ZM4 14V21.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

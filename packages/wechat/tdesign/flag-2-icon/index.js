var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 14V3H4V14H8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 16H20L18 10.5L20 5H13L11 3H8V14H11L13 16Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 3H11L13 5H20L18 10.5L20 16H13L11 14H4M4 3V14M4 3H8V14H4M4 14V21.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

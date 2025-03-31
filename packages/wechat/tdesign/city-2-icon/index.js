var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M9 4.5V13L15 8L21 13V21H3V4.5L6 2L9 4.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M17 15H13V21H17V15Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M17 15H13V21H17V15Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M9 13V21M9 13V4.5L6 2L3 4.5V21H9M9 13L15 8L21 13V21H9M9 21C9.70578 21 8.36845 21 9 21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

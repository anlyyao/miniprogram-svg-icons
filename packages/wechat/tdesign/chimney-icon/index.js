var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M9 21V14L15 11L21 14V21H9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 21L4 7L3 3H12L11 7L11.5 12.75L9 14V21H3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 7L3 21H9V14L11.5 12.75L11 7M4 7L3 3H12L11 7M4 7H11M15 18V21" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 21V14L15 11L21 14V21H9Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

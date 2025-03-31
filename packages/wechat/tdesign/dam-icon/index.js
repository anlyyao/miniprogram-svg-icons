var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 9L12 2L20 9V21H15V9H9V21H4V9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 21V9L12 2L20 9V21M4 21H3M4 21C8 21 5 21 9 21M20 21H21M20 21C20 21 16 21 14 21M9 9V21M9 9H15M9 9H4.75M9 21H10M15 9V21M15 9H19.25" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

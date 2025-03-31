var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21H21V9H3V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3H3V9H21V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 9H21M3 9V3H21V9M3 9V21H21V9M6.00391 6V6.00391H6V6H6.00391Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 13L17 13M7 17H11" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

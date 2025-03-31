var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 21V4C4 4 7 2 12 2C17 2 20 4 20 4V21H4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 10.5H12M8 14H12M8 17.5H12M8 8.5V21M12 21V8.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4 21V4C4 4 7 2 12 2C17 2 20 4 20 4V21M4 21H3M4 21H20M20 21H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

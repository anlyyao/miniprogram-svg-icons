var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 6.5L17.5 2L5 14.5L4.49902 16.4993L7.5 19.5L9.5 19L22 6.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 6.5L17.5 2L5 14.5L4.49902 16.4993L7.5 19.5L9.5 19L22 6.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4.5 21.5L2.5 19.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

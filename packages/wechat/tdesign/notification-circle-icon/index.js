var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C9.79086 6 8 7.79086 8 10L8 12.5L7 14.5L7 16L11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16L17 16L17 14.5L16 12.5L16 10C16 7.79086 14.2091 6 12 6Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C9.79086 6 8 7.79086 8 10L8 12.5L7 14.5L7 16L11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16L17 16L17 14.5L16 12.5L16 10C16 7.79086 14.2091 6 12 6Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15 5L1.00002 5.00001L1 19L15 19L15 5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M23 5L15 5.00001L15 19L23 19L23 5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5 9L11 9M5 13L9 13" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15.0001 5V19M1.00003 5.00001L23.0001 5L23.0001 19L1 19L1.00003 5.00001Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

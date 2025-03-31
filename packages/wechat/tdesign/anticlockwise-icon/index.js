var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8.99902 7H21.999V20H8.99902V7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8.99902 7H21.999V20H8.99902V7Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12.0003 3H7.3333C6.22887 3 5.33349 3.89522 5.3333 4.99965L5.33235 10.5H4.7768L1.99902 7.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

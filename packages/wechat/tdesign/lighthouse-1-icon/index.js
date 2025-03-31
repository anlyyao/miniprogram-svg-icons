var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 10V3.6L12 2L16 3.6V10C16 15 18 22 18 22H14L13 18H11L10 22H6C6 22 8 15 8 10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 4.1V10C8 15 6 22 6 22H10L11 18H13L14 22H18C18 22 16 15 16 10V4.1M6 11H18M7 4L12 2L17 4" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 6.99805H12.0039V7.00195H12V6.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

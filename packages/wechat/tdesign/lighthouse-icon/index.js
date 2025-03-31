var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6 22C6 22 8 15 8 10V3H16V10C16 15 18 22 18 22H14L13 18H11L10 22H6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 2V10C8 15 6 22 6 22H10L11 18H13L14 22H18C18 22 16 15 16 10V2M16 6H8M8 3H16" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 9.99805H12.0039V10.002H12V9.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

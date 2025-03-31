var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6 21.9999C6 21.9999 8 14.9999 8 9.99985V3.00146H16V9.99985C16 14.9999 18 21.9999 18 21.9999H14L13 17.9999H11L10 21.9999H6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 2V3.00161M8 3.00161V10C8 15 6 22 6 22H10L11 18H13L14 22H18C18 22 16 15 16 10V3.00161M8 3.00161H16M16 3.00161V2M17 6H7M18 14H6" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 9.99805H12.0039V10.002H12V9.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

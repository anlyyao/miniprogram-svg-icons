var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 9V3H8V9H16Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 5.99805H12.0039V6.00195H12V5.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16 3V9M16 3H8M16 3H17M8 3V9M8 3H7M16 9H18V12H19V15H20V18H21V22H14M16 9C15.1506 9 14 9 14 9M8 9H6V12H5V15H4V18H3V22H10M8 9C8.81054 9 10 9 10 9M10 9H14M10 9V12V15V18V22M10 22H14M14 22V18V15V12V9" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M6 12V9H10V22H3V18H4V15H5V12H6Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M18 12V9H14V22H21V18H20V15H19V12H18Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

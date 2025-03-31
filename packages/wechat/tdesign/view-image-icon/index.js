var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H21V21H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6 6H18V18H6V6Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 3H21V21H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M7 13L9 11L15.5 17.5M6 6H18V18H6V6ZM15 9.99996C15 10.5522 14.5523 11 14 11C13.4477 11 13 10.5522 13 9.99996C13 9.44768 13.4477 8.99996 14 8.99996C14.5523 8.99996 15 9.44768 15 9.99996Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

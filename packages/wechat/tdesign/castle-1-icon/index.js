var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M17 21H22V15H17V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 21H7V15H2V21Z" fill="{{fillColor2 || 'transparent'}}" /></g><path d="M17 5H7V21H17V5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 15V21H17V15H22ZM22 15V14M2 15V21H7V15H2ZM2 15V14M12 14V21M10 8.99805H10.0039V9.00195H10V8.99805ZM14 8.99805H14.0039V9.00195H14V8.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 3V5H7M10 3V5M10 5H14M10 5H7M14 3V5M14 5H17M18 3V5H17M7 5V21H17V5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

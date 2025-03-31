var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6 5H18C18 10.3333 18 15.6667 18 21H6V5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 15V21H6V15H2ZM2 15V14M22 15V21H18V15H22ZM22 15V14M10 14H14V21H10V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18 5V3M18 5H14M18 5C18 10.3333 18 15.6667 18 21H6V5M6 5V3M6 5H10M10 3V5M10 5H14M14 3V5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M14 14H10V21H14V14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 21H6V15H2V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M18 21H22V15H18V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M14 14H10V21H14V14Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

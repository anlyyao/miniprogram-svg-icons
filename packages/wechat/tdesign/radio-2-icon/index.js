var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4V18C15.3333 18 8.66667 18 2 18L2 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M18 11C18 12.6569 16.6569 14 15 14C13.3431 14 12 12.6569 12 11C12 9.34315 13.3431 8 15 8C16.6569 8 18 9.34315 18 11Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M6 18V21M18 18V21M22 4V18C15.3333 18 8.66667 18 2 18L2 4L22 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 9H8M6 13H8M18 11C18 12.6569 16.6569 14 15 14C13.3431 14 12 12.6569 12 11C12 9.34315 13.3431 8 15 8C16.6569 8 18 9.34315 18 11Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

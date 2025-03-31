var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 21V10C4 8 6 3 12 3C18 3 20 8 20 10V21H4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 21H9V16.9997C9 15.3429 10.3431 14 12 14C13.6569 14 15 15.3431 15 17V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 21H9V16.9997C9 15.3429 10.3431 14 12 14C13.6569 14 15 15.3431 15 17V21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4 10V21H20V10M4 10H20M4 10C4 8 6 3 12 3C18 3 20 8 20 10M3 10H21M3 21H21M11.417 3.5C10.2265 4.77897 9 7.59799 9 10M12.583 3.5C13.7735 4.77897 15 7.59799 15 10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

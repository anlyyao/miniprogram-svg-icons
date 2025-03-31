var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 4C13.6569 4 15 5.34315 15 7V8H17V11H20V21H4V11H7V8H9V7C9 5.34315 10.3431 4 12 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 18C9 16.3431 10.3431 15 12 15V15C13.6569 15 15 16.3431 15 18V21H9V18Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9 18C9 16.3431 10.3431 15 12 15V15C13.6569 15 15 16.3431 15 18V21H9V18Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 8V7C15 5.34315 13.6569 4 12 4M15 8H17M15 8H9M9 8V7C9 5.34315 10.3431 4 12 4M9 8H7M17 8V11M17 8H18M17 11H7M17 11H20M7 11V8M7 11H4M7 8H6M4 11V21M4 11H3M4 21H3M4 21H20M20 11V21M20 11H21M20 21H21M12 4V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

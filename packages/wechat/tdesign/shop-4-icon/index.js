var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17 3C18.6569 3 20 4.34315 20 6V21H4V6C4 4.34315 5.34315 3 7 3H17Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 21H9V15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 21H9V15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15V21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4 8V6C4 4.34315 5.34315 3 7 3H9M4 8V21M4 8H9M4 8H3M4 21H3M4 21H20M20 8V21M20 8H15M20 8V6C20 4.34315 18.6569 3 17 3H15M20 8H21M20 21H21M9 8H15M9 8V3M15 8V3M9 3H15" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

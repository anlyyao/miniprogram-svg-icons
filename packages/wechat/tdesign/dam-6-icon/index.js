var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 3H20V21H15V15C15 13.3431 13.6569 12 12 12V12C10.3431 12 9 13.3431 9 15V21H4V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 21H3M4 21H9M4 21V3H20V21M20 21H21M20 21H15M9 21H10M9 21V15C9 13.3431 10.3431 12 12 12V12C13.6569 12 15 13.3431 15 15V21M14 21H15" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 8H4H9H15H20H21" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

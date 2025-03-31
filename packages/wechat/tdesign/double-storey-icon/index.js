var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17 9H20V21H4V9H7V3H17V9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 21V14H15V21H9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M6 3H7M7 3V9H17V3M7 3H17M17 3H18M3 9H4M4 9V21M4 9H20M4 21H3M4 21H20M20 9V21M20 9H21M20 21H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M11.998 5.99805H12.002V6.00195H11.998V5.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 21V14H15V21H9Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

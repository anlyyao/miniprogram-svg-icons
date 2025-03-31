var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 12V11H3V12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 4L17 4M17 4H20M17 4V10M20 4H21M20 4V10M4 10C4 7.23858 6.23858 5 9 5C11.7614 5 14 7.23858 14 10V11H4L4 10ZM7 10C7 8.89543 7.89543 8 9 8C10.1046 8 11 8.89543 11 10V11H7V10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 12V11H3V12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

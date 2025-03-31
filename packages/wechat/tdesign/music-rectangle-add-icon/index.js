var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13 14C13 15.1046 12.1046 16 11 16C9.89543 16 9 15.1046 9 14C9 12.8954 9.89543 12 11 12C12.1046 12 13 12.8954 13 14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 12V3H3V21H12M15 8H13V13.25M13 14C13 15.1046 12.1046 16 11 16C9.89543 16 9 15.1046 9 14C9 12.8954 9.89543 12 11 12C12.1046 12 13 12.8954 13 14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19 16V19M19 19V22M19 19H16M19 19H22" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

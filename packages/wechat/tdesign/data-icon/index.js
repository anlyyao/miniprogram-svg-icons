var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21H21V3H3V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 12V21H3V12M21 12H3M21 12V3H3V12M6.99805 7.5H7.00195V7.50391H6.99805V7.5ZM6.99805 16.5H7.00195V16.5039H6.99805V16.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

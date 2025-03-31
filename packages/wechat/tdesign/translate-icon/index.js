var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13 14H17M17 14H21M17 14V12.5M20 14C20 17.866 16.866 21 13 21M14.6736 17C15.7971 19.3649 18.2076 21 21 21M9 7.5V5C9 3.89543 8.10457 3 7 3H5C3.89543 3 3 3.89543 3 5V7.5M9 7.5V10M9 7.5H3M3 10V7.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M13 4.5H18C19.1046 4.5 20 5.39543 20 6.5V8M5 14V19C5 20.1046 5.89543 21 7 21H8.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

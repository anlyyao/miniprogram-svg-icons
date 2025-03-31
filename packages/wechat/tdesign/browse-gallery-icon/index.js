var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M19 12C19 16.9706 14.9706 21 10 21C5.02944 21 1 16.9706 1 12C1 7.02944 5.02944 3 10 3C14.9706 3 19 7.02944 19 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10 7.5V12L13 15M19 12C19 16.9706 14.9706 21 10 21C5.02944 21 1 16.9706 1 12C1 7.02944 5.02944 3 10 3C14.9706 3 19 7.02944 19 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19.3809 21C21.6224 18.6642 23 15.493 23 12C23 8.50702 21.6224 5.33579 19.3809 3" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

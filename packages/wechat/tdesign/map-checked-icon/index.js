var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15 6.5L9 3L3 6.5V20L9 17.5M15 6.5L21 4V11M15 6.5V11M9 17.5V3.5M9 17.5L10.5 18.375" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M13.7578 17.4144L16.5862 20.2428L22.2431 14.5859" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

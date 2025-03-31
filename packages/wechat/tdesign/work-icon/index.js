var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 7.5H21V20.5H3V7.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15.5 7.5V3.5H8.5V7.5M3 7.5H21V20.5H3V7.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

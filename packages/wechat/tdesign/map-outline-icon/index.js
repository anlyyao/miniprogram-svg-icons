var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 6.5V20L9 17.5L15 21L21 17.5V4L15 6.5L9 3L3 6.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 6.5V20L9 17.5L15 21L21 17.5V4L15 6.5L9 3L3 6.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

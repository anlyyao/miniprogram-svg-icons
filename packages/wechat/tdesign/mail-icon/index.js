var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4H2V20L22 20V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 4H22V7.44444L12 12.5L2 7.44444V4Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 4H22M2 4V20L22 20V4M2 4V7.44444L12 12.5L22 7.44444V4" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

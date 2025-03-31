var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4L22 20L2 20L2 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 4L22 20L2 20L2 4L22 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6.33008 14.33L8.65693 12L6.33008 9.67M13.0001 16H18.0001" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

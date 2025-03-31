var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 20H22V9H2V20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 4H22V9H2V4Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 9H2M22 9V20H2V9M22 9V4H2V9" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 12.5L9 14.5L7 16.5M13 16L17 16" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 4H22V10H2V4Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 20H2V10H22V20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 20V4H2V20M22 20H2M22 20V10H2V20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 14L16 14M6.00391 7.00391H6V7M10.0039 7.00391H10V7M14.0039 7.00391H14V7" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

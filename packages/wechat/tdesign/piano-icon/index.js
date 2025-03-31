var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 20H22V10H2V20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 4H22V10H2V4Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 10V4H2V10M22 10H2M22 10V20H2V10M6 10V15M10 10V15M14 10V15M18 10V15" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

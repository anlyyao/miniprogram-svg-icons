var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 10H22V22H5V10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5.5 10.5L13.5 16L21.5 10.5M5 10H22V11V22H5V11V10Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M1 19V8.5V7.5L9.5 2.5L13.75 5L15.875 6.25" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

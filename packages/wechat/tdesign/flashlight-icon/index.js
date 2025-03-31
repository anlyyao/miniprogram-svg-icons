var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 23H16V10L19 7V4.5H5V7L8 10V23Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M19 1H5V4.5H19V1Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5 4.5V7L8 10V23H16V10L19 7V4.5M5 4.5H19M5 4.5V1H19V4.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 11H12.0039V11.0039H12V11Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

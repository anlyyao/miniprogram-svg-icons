var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M19 21V9H5V21H19Z" fill="white" /><path d="M5 3H19V9H5V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M19 3V21H5V3M19 3H5M19 3V9H5V3M14 9L14 21M10 9L10 21M5 13H19M5 17H19" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

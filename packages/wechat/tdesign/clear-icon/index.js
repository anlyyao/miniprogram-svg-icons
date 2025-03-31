var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14 2L10 2L10 10.5L4 10.5V15L20 15L20 10.5H14L14 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 15L4 22L20 22V15L4 15Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 15V22H20V15M4 15H20M4 15V10.5H10V2H14V10.5H20V15M15 22V19" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5.79297 12.75L7.35547 11H4.23047L5.79297 12.75Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 19L3 19M21 5H3M21 12L12 12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M5.79297 12.75L7.35547 11H4.23047L5.79297 12.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

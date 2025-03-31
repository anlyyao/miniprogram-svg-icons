var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4.75 12L3 13.5625L3 10.4375L4.75 12Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 19L3 19M21 12L10 12M21 5H3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4.75 12L3 13.5625L3 10.4375L4.75 12Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

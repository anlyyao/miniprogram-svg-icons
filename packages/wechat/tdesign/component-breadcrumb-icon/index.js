var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14 12L9.49999 7.5L3 7.5L3 16.5L9.5 16.5L14 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 12L9.49999 7.5L3 7.5L3 16.5L9.5 16.5L14 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16 7.5L20.5 12L16 16.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

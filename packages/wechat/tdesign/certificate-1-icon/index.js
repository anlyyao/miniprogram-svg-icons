var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 2L4 22L20 22L20 2L4 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 2L12 2V7.5L10 6L8 7.5V2Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M8 13H16M8 17H14M12 2H8L8 7.5L10 6L12 7.5V2Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4 2L4 22L20 22L20 2L4 2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

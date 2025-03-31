var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M8 18L8 6L3 6L3 18H8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 18V6L16 6L16 18H21Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M8 18L8 6L3 6L3 18H8Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M21 18V6L16 6L16 18H21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g><path d="M12 3L12 21" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

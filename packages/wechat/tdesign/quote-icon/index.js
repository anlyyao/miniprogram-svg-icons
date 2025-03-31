var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M10.0001 6H3.5V12H8.00009L5.33343 18H6.00009L10.0001 12.3333V6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20.5 6H14V12H18.5L15.8333 18H16.5L20.5 12.3333V6Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M10.0001 6H3.5V12H8.00009L5.33343 18H6.00009L10.0001 12.3333V6Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20.5 6H14V12H18.5L15.8333 18H16.5L20.5 12.3333V6Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

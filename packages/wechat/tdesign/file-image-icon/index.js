var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 22H20V8H14V2H4V22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 2V8H20M14 2H4V22H20V8M14 2H15L20 7V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M8.62207 16.9995L9.0634 16.5582L10.5442 15.1262L11.1842 15.8962L12.728 14.3516L15.3759 16.9995M9 12H9.00391V12.0039H9V12Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

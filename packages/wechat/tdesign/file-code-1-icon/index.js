var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 22H20V8H14V2H4V22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M9.7929 15.7931L8 14.0002L9.79289 12.2073M14.2069 15.7931L15.9998 14.0002L14.207 12.2073" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 22H20V8H4V22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 2H4V8H20V2Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M20 8V2H4V8M20 8H4M20 8V22H4V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 13H10M14 13H16M14 17H16M8 17H10" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

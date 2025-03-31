var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 22H20V8H14V2H4V22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M14.4964 16.4951H9.5V16.5335L10.75 17.9998M9.5 13.5047H14.5V13.4663L13.25 12" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

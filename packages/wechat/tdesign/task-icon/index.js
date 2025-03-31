var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 22V4H16V6H8V4H4V22H20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 6H8V2H16V6Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M16 4H20V22H4V4H8M16 4V2H8V4M16 4V6H8V4" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10 12H14M10 16H14" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 4H8V6H16V4H20V22H4V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 4H20V22H4V4H8M16 4V2H8V4M16 4V6H8V4" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><rect x="8" y="2" width="8" height="4" fill="{{fillColor2 || 'transparent'}}" /></g></svg>`,
  },
});

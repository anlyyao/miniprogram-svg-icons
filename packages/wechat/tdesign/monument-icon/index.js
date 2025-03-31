var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15 6V16H9V6L8 3H16L15 6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 19H18V22H6V19H8V16H16V19Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 6H9M15 6V16H9V6M15 6L16 3V2M9 6L8 3V2M8.5 3H15.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16 19V16H8V19M16 19H8M16 19H18V22H6V19H8" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

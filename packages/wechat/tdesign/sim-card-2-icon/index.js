var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 2V22H4V6L8 2H20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 2V22H4V6L8 2H20Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 11.5429 13.7837 12.0352 13.4326 12.3956L10 15.4V15.7333H14" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

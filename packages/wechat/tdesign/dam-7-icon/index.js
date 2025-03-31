var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18 6H20V21H4V6H6L7 2H17L18 6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 21V13H9V21H15Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 21V13H9V21H15Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M21 21H3M20 6C20 12 20 15.4651 20 21H4V6H20ZM6 6L7 2H17L18 6H6Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

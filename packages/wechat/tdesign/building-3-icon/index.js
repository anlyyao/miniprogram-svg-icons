var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15 3V6H18V10H21V21H3V10H6V6H9V3H15Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 15V21H15V15H9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9 15V21H15V15H9Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 6V3H9V6M15 6H18V10M15 6H9M9 6H6V10M18 10H6M18 10H21V21H3V10H6" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

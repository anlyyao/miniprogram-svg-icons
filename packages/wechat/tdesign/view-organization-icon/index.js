var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><rect x="3" y="3" width="18" height="18" fill="{{fillColor1 || 'transparent'}}" /><rect x="3" y="3" width="18" height="18" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M9 6H15V9H9V6Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M6 15H10V18H6V15Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M14 15H18V18H14V15Z" fill="{{fillColor2 || 'transparent'}}" /></g><path d="M12 9V12M8 15V12H16V15M9 6H15V9H9V6ZM6 15H10V18H6V15ZM14 15H18V18H14V15Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

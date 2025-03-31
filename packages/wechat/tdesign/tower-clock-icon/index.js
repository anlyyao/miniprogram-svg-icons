var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18 16H16V22H8V16H6V6H9V3.125L12 2L15 3.125V6H18V16Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M16 16V22H8V16M16 16H18V6H6V16H8M16 16H12M8 16H12M12 16V19M8 3.5L12 2L16 3.5M9 6V3.65M15 3.65V6" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14 11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

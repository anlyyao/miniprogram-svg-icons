var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 5.5V21H3V5.5L6 3L9 5.5V10H15V5.5L18 3L21 5.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21H10Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21H10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 10V21H21V10M3 10V5.5L6 3L9 5.5V10M3 10H9M21 10V5.5L18 3L15 5.5V10M21 10H15M9 10H15" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

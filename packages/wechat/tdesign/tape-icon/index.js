var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4V20H2L2 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><g><path d="M17 7H7L5 4H19L17 7Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M10 13C10 14.1046 9.10457 15 8 15C6.89543 15 6 14.1046 6 13C6 11.8954 6.89543 11 8 11C9.10457 11 10 11.8954 10 13Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M18 13C18 14.1046 17.1046 15 16 15C14.8954 15 14 14.1046 14 13C14 11.8954 14.8954 11 16 11C17.1046 11 18 11.8954 18 13Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M22 4V20H2L2 4L22 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 7H7L5 4H19L17 7Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><g><path d="M10 13C10 14.1046 9.10457 15 8 15C6.89543 15 6 14.1046 6 13C6 11.8954 6.89543 11 8 11C9.10457 11 10 11.8954 10 13Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18 13C18 14.1046 17.1046 15 16 15C14.8954 15 14 14.1046 14 13C14 11.8954 14.8954 11 16 11C17.1046 11 18 11.8954 18 13Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

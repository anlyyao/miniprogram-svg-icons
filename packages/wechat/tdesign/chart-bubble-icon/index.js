var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M13 14C13 15.6569 11.6569 17 10 17C8.34315 17 7 15.6569 7 14C7 12.3431 8.34315 11 10 11C11.6569 11 13 12.3431 13 14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M18 6C18 7.10457 17.1046 8 16 8C14.8954 8 14 7.10457 14 6C14 4.89543 14.8954 4 16 4C17.1046 4 18 4.89543 18 6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 14C20 14.5523 19.5523 15 19 15C18.4477 15 18 14.5523 18 14C18 13.4477 18.4477 13 19 13C19.5523 13 20 13.4477 20 14Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M18 6C18 7.10457 17.1046 8 16 8C14.8954 8 14 7.10457 14 6C14 4.89543 14.8954 4 16 4C17.1046 4 18 4.89543 18 6Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19 15C18.4477 15 18 14.5523 18 14C18 13.4477 18.4477 13 19 13C19.5523 13 20 13.4477 20 14C20 14.5523 19.5523 15 19 15Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M13 14C13 15.6569 11.6569 17 10 17C8.34315 17 7 15.6569 7 14C7 12.3431 8.34315 11 10 11C11.6569 11 13 12.3431 13 14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><path d="M21 21H3V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

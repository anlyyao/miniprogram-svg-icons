var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17 10V13H21V21H3V13H7V10L12 6.5L17 10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 21V16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16V21H14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M14 21V16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16V21H14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 13H21V21H17M17 13V21M17 13V10L12 6.5M17 21H7M12 6.5L7 10V13M12 6.5V4M7 13H3V21H7M7 13V21M12 2V4M12 4H14M12 4H10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

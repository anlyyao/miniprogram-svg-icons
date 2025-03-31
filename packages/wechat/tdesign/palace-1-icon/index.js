var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21V10H7V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10H21V21H3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7 10V9C7 6.23858 9.23858 4 12 4M7 10H17M7 10H3V21H21V10H17M17 10V9C17 6.23858 14.7614 4 12 4M12 4L12.002 3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M6 21V17C6 15.8954 6.89543 15 8 15C9.10457 15 10 15.8954 10 17V21H6Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M14 21V17C14 15.8954 14.8954 15 16 15C17.1046 15 18 15.8954 18 17V21H14Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M11.998 6.99805H12.002V7.00195H11.998V6.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 21V17C6 15.8954 6.89543 15 8 15C9.10457 15 10 15.8954 10 17V21H6Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14 21V17C14 15.8954 14.8954 15 16 15C17.1046 15 18 15.8954 18 17V21H14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

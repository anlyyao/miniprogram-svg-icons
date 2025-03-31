var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M23 4L1 4L1 20L23 20L23 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M23 4L1 4L1 20L23 20L23 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 12L6 9C6 8.44771 6.44772 8 7 8L9 8C9.55228 8 10 8.44771 10 9V12M6 12L6 16M6 12H10M10 12V16M14 12V8H17C17.5523 8 18 8.44772 18 9V12M14 12H18M14 12V16H17C17.5523 16 18 15.5523 18 15V12" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

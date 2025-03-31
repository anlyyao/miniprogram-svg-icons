var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 21V9.25L12 3L19 9.22222V21H5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10.0003 16V21H14.0003V16H10.0003Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M10 10H12M12 10H14M12 10V8M12 10V12M10.0003 21V16H14.0003V21H10.0003Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M5 9.77653V21H19V9.75M3 11L12 3L21 11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

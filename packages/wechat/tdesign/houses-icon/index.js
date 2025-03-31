var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 21V9.25L12 3L19 9.22222V21H5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10.0003 15V21H14.0003V15H10.0003Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M10.0003 21V15H14.0003V21H10.0003ZM10.0003 21C10.3133 21 9.64381 21 10.0003 21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 11L12 3L3 11M5 9.97606V21H19V9.95M7 6.75V4" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

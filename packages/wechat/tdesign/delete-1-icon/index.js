var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 5H19L18.5 22H5.5L5 5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5 5H19M5 5L5.5 22H18.5L19 5M5 5H3M19 5H21M8.5 2H15.5V5H8.5V2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14.8287 10.6716L12.0003 13.5001M12.0003 13.5001L9.17188 16.3285M12.0003 13.5001L9.17188 10.6716M12.0003 13.5001L14.8287 16.3285" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8.12602 14H2V21H22V14H15.874C15.4299 15.7252 13.8638 17 12 17C10.1362 17 8.57006 15.7252 8.12602 14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2.5 14H8.12602C8.57006 15.7252 10.1362 17 12 17C13.8638 17 15.4299 15.7252 15.874 14H21.5M22 21H2V14L6 7H18L22 14V21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6.50098 3.5L5.00098 2M17.499 3.5L18.999 2M12 3V1" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

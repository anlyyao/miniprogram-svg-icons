var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M8 3V6.5H3V3H8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3V6.5H16V3H21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 17.5V21H3V17.5H8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 17.5V21H16V17.5H21Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M5.5 13.5V17.5M5.5 13.5H18.5M5.5 13.5V10M18.5 13.5V17.5M18.5 13.5V10M5.5 10V6.50003M5.5 10H18.5M18.5 10V6.50003M16 17.5H21V21.0002H16V17.5ZM3 17.5H8V21.0002H3V17.5ZM16 6.50016H21V3H16V6.50016ZM3 6.50016H8V3H3V6.50016Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

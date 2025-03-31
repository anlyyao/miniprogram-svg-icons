var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M16 17.5H21V21.0002H16V17.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 17.5H8V21.0002H3V17.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 6.50016H21V3H16V6.50016Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 6.50016H8V3H3V6.50016Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9.50006 13.5002H14.5001V10H9.50006V13.5002Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M5.5 17.5V12H9.50006M18.5 17.5V12H14.5001M5.5 6.50016V13.5003M18.5 6.50016V13.5003M16 17.5H21V21.0002H16V17.5ZM3 17.5H8V21.0002H3V17.5ZM16 6.50016H21V3H16V6.50016ZM3 6.50016H8V3H3V6.50016ZM9.50006 13.5002H14.5001V10H9.50006V13.5002Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

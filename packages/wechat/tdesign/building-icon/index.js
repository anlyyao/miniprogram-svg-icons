var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 6H19V10H20V21H4V10H5V6H8V3H16V6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 15V21H15V15H9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9 15V21H15V15H9Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16 6V3H8V6M16 6H19V10M16 6H8M8 6H5V10M19 10H5M19 10H20M5 10H4M4 10V21M4 10H3M4 21H3M4 21H20M20 10V21M20 10H21M20 21H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

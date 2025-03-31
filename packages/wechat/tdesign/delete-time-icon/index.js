var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14 18.5C14 20.9853 16.0147 23 18.5 23C20.9853 23 23 20.9853 23 18.5C23 16.0147 20.9853 14 18.5 14C16.0147 14 14 16.0147 14 18.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5 5H19M5 5L5.5 22H10.5M5 5H3M19 5H21M19 5L18.8382 10.5M12 9V14M8.5 2H15.5V5H8.5V2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18.5 17.252V18.4999L19.5 19.5M18.5 23C16.0147 23 14 20.9853 14 18.5C14 16.0147 16.0147 14 18.5 14C20.9853 14 23 16.0147 23 18.5C23 20.9853 20.9853 23 18.5 23Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 8.5V20H15.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9.5 16H8V14.5M13.5 16H14.5M18.5 4H20V5.5M20 9.5V10.5M18.5 16H20V14.5M8 9.5V10.5M9.5 4H8V5.5M13.5 4H14.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

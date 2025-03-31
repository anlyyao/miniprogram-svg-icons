var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M19 15H15V19M15.8839 15.8839L20 20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8.5 3H9.5M13.5 3H14.5M8.5 20H9.5M20 8.5V9.5M3 8.5V9.5M3 13.5V14.5M4.5 3H3V4.5M4.5 20H3V18.5M18.5 3H20V4.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

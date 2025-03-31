var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15 6.5L9 3L3 6.5V20L9 17.5M15 6.5L21 4V10M15 6.5V10M9 17.5V3.5M9 17.5L10.5 18.375" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20.8287 14.1719L18.0003 17.0003M18.0003 17.0003L15.1719 19.8287M18.0003 17.0003L15.1719 14.1719M18.0003 17.0003L20.8287 19.8287" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 14H14L14 21L17.502 19.4971L22 19.4971V14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 6.5L9 3L3 6.5V20L9 17.5M15 6.5L21 4V10M15 6.5V10M9 17.5V3.5M9 17.5L10.5 18.375" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 14H14L14 21L17.502 19.4971L22 19.4971V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

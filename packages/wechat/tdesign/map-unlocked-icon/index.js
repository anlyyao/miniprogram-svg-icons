var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.499 17H21.499V21.5H14.499V17Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 6.5L9 3L3 6.5V20L9 17.5M15 6.5L21 4V10M15 6.5V10M9 17.5V3.5M9 17.5L10.5 18.375" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15.75 17V15.25C15.75 14.0074 16.7574 13 18 13C18.6188 13 19.1793 13.2498 19.5861 13.6541M14.499 17H21.499V21.5H14.499V17Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

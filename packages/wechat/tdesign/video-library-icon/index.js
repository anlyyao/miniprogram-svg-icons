var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 9H21L19.2 21H4.8L3 9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13.5 15L11.5 16.5V13.5L13.5 15Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5 6H19M7 3H17M3 9H21L19.2 21H4.8L3 9Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M13.5 15L11.5 16.5V13.5L13.5 15Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

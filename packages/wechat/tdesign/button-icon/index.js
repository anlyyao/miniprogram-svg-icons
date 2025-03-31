var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 6H21V18H3V6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7 10H17V14H7V10Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 6H21V18H3V6Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M7 10H17V14H7V10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

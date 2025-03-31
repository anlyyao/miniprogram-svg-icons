var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7 4H17V20H7V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7 4H17V20H7V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M3 6V18H7V6H3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 6V18H17V6H21Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M3 6V18H7V6H3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M21 6V18H17V6H21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

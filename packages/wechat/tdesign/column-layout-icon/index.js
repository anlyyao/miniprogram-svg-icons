var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3L3 21H10L10 3L3 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 3L14 21H21L21 3L14 3Z" fill="{{fillColor2 || 'transparent'}}" /><g><path d="M3 3L3 21H10L10 3L3 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M14 3L14 21H21V3L14 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

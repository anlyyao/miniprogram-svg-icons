var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3L3 21H9L11 12L13 3L3 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3L13 3L9 21L21 21L21 3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M13 3L3 3L3 21H9M13 3L21 3L21 16M13 3L11 12M9 21L21 21V16M9 21L11 12M21 16L11 12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

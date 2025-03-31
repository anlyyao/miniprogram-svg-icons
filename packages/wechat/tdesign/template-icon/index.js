var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 21L21 9L3 9L3 21H10L21 21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3L3 3L3 9H10L21 9V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 9V21H10M21 9H3M21 9V3H3V9M21 9H10M3 9V21H10M3 9H10M10 21V9" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

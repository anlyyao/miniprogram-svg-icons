var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 21L21 9L3 9L3 21L21 21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3L3 3L3 9H9L15 9L21 9V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 9V21H3V9M21 9H3M21 9V3H3V9M21 9L15 9M3 9L9 9M9 9H15M9 9V21M15 9V21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

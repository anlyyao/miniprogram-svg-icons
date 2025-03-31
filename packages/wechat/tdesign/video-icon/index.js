var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H21V21H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15.75 11.9997L9 15.8968L9 8.10254L15.75 11.9997Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 3H21V21H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M15.75 11.9997L9 15.8968L9 8.10254L15.75 11.9997Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

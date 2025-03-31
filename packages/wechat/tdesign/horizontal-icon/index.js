var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><rect x="3" y="11" width="18" height="10" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 3H21V7H3V3Z" fill="{{fillColor2 || 'transparent'}}" /><g><path d="M3 11H21V21H3V11Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 3H21V7H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

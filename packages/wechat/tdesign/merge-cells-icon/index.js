var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3L21 3L21 21L3 21L3 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 7V3M12 21V17M3 3V21H21V3H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8.33008 13.768L10.0978 12.0002L8.33008 10.2324M15.768 10.2321L14.0002 11.9998L15.768 13.7676" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

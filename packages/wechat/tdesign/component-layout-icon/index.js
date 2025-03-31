var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 3L16.5 3L12 3L12 21H16.5H21L21 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 3L7.5 3L3 3L3 21H7.5H12L12 3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 3H3L3 21H12M12 3H21V21H12M12 3V12M12 21V12M12 12H3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

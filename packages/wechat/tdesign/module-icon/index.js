var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3L3 21H12L12 12L12 3L3 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3L12 3L12 21H21L21 3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 3H3V21H12M12 3V12M12 3H21V21M12 3V21M12 21V12M12 21H21M12 12H21V21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

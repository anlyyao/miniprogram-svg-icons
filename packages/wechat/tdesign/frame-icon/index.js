var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 21L21 21L21 3L12 3L3 3L3 21H12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21H21V3H12M12 21H3V3H12M12 21V3M3 12H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

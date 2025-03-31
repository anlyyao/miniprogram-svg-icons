var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3L11 3L11 13L21 13L21 21L3 21L3 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 7.5H5.00368M3 12H5.00368M3 16.5H5.00368M7.5 20.9996V19.0322M12 20.9996V19.0322M16.5 20.9996V19.0322M3 3H11V13H21V21H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><rect x="3" y="3" width="8" height="18" fill="{{fillColor1 || 'transparent'}}" /><rect x="3" y="3" width="8" height="18" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M15.5 18L18.5 21L21.5 18M21.5 6.00001L18.5 3L15.5 6M18.5 20.25V3.75" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

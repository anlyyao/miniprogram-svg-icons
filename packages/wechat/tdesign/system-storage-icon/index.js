var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 20.9997H3V3H15.375L21 8.62489V20.9997Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 3L7.5 3.00035V8.62524H12V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M8 13H16M8 16H12M7.5 3.00035L12 3V8.62524H7.5V3.00035Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 20.9997H3V3H15.375L21 8.62489V20.9997Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

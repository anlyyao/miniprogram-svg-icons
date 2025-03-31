var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="12" r="10" fill="{{fillColor1 || 'transparent'}}" /><circle cx="12" cy="12" r="10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M6.77539 9.04812C7.8058 7.22821 9.75958 6 12.0002 6M6.00391 12.2091L6.00391 12.1328" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

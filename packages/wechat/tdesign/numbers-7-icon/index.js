var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 5H16.5V7.11339C16.5 7.36216 16.4073 7.60199 16.2399 7.78607L11.7601 12.7139C11.5927 12.898 11.5 13.1378 11.5 13.3866V19" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

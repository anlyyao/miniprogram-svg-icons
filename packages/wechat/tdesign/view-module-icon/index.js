var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 20H22V4H2V20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8.6665 4V20M15.333 4V20M2 12H22M2 20H22V4H2V20Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

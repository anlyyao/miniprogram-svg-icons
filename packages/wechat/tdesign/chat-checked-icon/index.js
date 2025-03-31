var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 3H21.5V17H6.5L2.5 20.5V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2.5 3H21.5V17H6.5L2.5 20.5V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7.75781 10.4141L10.5862 13.2425L16.2431 7.58569" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

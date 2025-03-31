var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1 5L0.999999 19L16 19L16 5L1 5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M23 6L16 10.2L16 14L23 18L23 6Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5.5 12L11.5 12" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M23 6L16 10.2V14L23 18V6Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M1 5L1 19H16V5L1 5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

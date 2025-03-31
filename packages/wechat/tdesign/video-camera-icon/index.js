var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1 5H16V19H1V5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 10.2L23 6V18L16 13.8V10.2Z" fill="{{fillColor2 || 'transparent'}}" /><g><path d="M16 10.2L23 5.99997V18L16 13.8V10.2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M1 5H16V19H1V5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

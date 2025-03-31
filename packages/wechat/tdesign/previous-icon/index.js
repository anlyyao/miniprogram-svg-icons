var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11 12L16.25 17.25V6.75L11 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7.5 18V6M16.25 17.25L11 12L16.25 6.75V17.25Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

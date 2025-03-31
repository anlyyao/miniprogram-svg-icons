var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7 2L17 2V22H7L7 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7 7H9.5M7 12H11M7 17H9.5M7 2H17V22H7V2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

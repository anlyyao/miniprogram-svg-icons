var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13 12L7.75 17.25V6.75L13 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16.5 18V6M7.75 17.25L13 12L7.75 6.75V17.25Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

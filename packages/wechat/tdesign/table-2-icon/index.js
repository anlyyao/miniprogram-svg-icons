var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 4.5H21.5V19.5H2.5V4.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 4.5V19.5M21.5 9.5H2.5M21.5 14.5H2.5M2.5 4.5H21.5V19.5H2.5V4.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

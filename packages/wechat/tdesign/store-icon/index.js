var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3.5 6.5H20.5L21.5 11.5V12.5H2.5V11.5L3.5 6.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 20.5V12.5H4V20.5H13Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4.5 3.5H19.5M20 12.5V20.5M3.5 6.5H20.5L21.5 11.5V12.5H2.5V11.5L3.5 6.5ZM13 12.5V20.5H4V12.5H13Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

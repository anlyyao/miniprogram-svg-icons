var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7.5 3L3 21H12L16.5 3H7.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 21H12M12 21H3L7.5 3H16.5L12 21ZM7 7.5H10.875M5.5 12H9.75M4.5 16.5H8.625" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

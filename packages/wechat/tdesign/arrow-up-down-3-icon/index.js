var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3.5 8.5L7.49999 4.5L11.5 8.5M7.49999 5.75L7.49999 14.5M12.5 15.5L16.5 19.5L20.5 15.5M16.5 18.25L16.5 9.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18.5 15L21.5 12L18.5 9M5.5 8.99999L2.5 12L5.5 15M15 5.5L12 2.5L9 5.5M9 18.5L12 21.5L15 18.5M12 3.75V12M12 12V20.25M12 12L20.25 12M12 12L3.75 12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

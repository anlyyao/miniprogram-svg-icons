var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_5327)"><path d="M15 5L12 2L9 5M8.99999 19L12 22L15 19M19 15L22 12L19 9M5 8.99999L2 12L5 15M12 3V12M12 12V21M12 12H21M12 12H3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_8057)"><path d="M15 5L12 2L9 5M19 15L22 12L19 9M9 19L12 22L15 19M5 8.99999L2 12L5 15M11.998 11.998H12.002V12.002H11.998V11.998Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13 16L17 16M7 12.5L9 14.5L7 16.5M2 4V20H22V12M2 4V9H14M2 4H12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19 2.75L19.7 4.29996L21.25 5L19.7 5.70004L19 7.25L18.3 5.70004L16.75 5L18.3 4.29996L19 2.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

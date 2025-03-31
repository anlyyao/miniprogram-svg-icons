var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 8H12.5M8 12H16M8 16H13M20.5 12V21.5H3.5V2.5H12.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19 2.75L19.7 4.29996L21.25 5L19.7 5.70004L19 7.25L18.3 5.70004L16.75 5L18.3 4.29996L19 2.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

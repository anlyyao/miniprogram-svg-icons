var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 18V6H17L15.5 3H8.5L8.03125 3.9375M2 20V6H6L20 20H2ZM12 16.5C9.79086 16.5 8 14.7092 8 12.5C8 11.2682 8.55686 10.1664 9.43258 9.43262L15.0674 15.0675C14.3337 15.9432 13.2319 16.5 12 16.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M2 2L21 21" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

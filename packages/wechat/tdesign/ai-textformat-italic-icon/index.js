var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M10 3H12.5M10 3H7.5M10 3V21M10 21H7.5M10 21H12.5M6 7.5H3V16.5H6M21 12.5V16.5H14" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18.25 5.75L18.7697 6.98028L20 7.5L18.7697 8.01972L18.25 9.25L17.7303 8.01972L16.5 7.5L17.7303 6.98028L18.25 5.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

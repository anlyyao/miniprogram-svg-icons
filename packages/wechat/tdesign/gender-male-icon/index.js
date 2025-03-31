var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 14C16 17.3137 13.3137 20 10 20C6.68629 20 4 17.3137 4 14C4 10.6863 6.68629 8 10 8C13.3137 8 16 10.6863 16 14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 9.5V4H14.5M14.75 9.25L19.5 4.5M16 14C16 17.3137 13.3137 20 10 20C6.68629 20 4 17.3137 4 14C4 10.6863 6.68629 8 10 8C13.3137 8 16 10.6863 16 14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

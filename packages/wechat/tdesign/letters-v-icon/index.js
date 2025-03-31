var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 5L16 14.2732C16 14.5047 15.9196 14.7291 15.7727 14.908L12 19.5L8.22733 14.908C8.08035 14.7291 8 14.5047 8 14.2732L8.00001 5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" stroke-linejoin="bevel" /></g></svg>`,
  },
});

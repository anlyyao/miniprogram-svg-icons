var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17.5 13L12 20.25L6.5 13H10V3H14V13H17.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M17.5 13L12 20.25L6.5 13H10V3H14V13H17.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

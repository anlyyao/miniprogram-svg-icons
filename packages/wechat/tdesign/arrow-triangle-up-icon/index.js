var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17.5 11L12 3.75L6.5 11H10V21H14V11H17.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M17.5 11L12 3.75L6.5 11H10V21H14V11H17.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

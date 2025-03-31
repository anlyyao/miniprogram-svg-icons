var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1 4H23V17C15.6667 17 8.33333 17 1 17V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6.46517 17.4063L2.75 20.25M17.5348 17.4063L21.25 20.25M1 4H23V17C15.6667 17 8.33333 17 1 17V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

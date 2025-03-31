var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21.448 13C20.9483 17.7767 16.909 21.5 12 21.5C8.18227 21.5 4.89052 19.248 3.38065 16M2.5 20.5V15.5H5.5M2.55176 11C3.05145 6.22334 7.09079 2.5 11.9998 2.5C15.8175 2.5 19.1092 4.75197 20.6191 8M21.4998 3.5V8.5H18.4998" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

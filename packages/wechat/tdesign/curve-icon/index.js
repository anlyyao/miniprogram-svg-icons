var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 11.7576C2 9.33333 4.31081 4 6.62162 4C8.93243 4 10.9865 8.84848 11.5 11.7576C11.8851 14.3434 14.1892 20 16.5 20C18.8108 20 21 14.6667 21 11.7576" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 12H18M5 12H8" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

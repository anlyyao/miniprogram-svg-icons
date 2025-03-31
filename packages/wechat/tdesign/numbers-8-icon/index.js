var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 12V18C8 18.5523 8.44772 19 9 19H15C15.5523 19 16 18.5523 16 18V12M8 12V6C8 5.44772 8.44772 5 9 5H15C15.5523 5 16 5.44772 16 6V12M8 12H16" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

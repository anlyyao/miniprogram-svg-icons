var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8.5 19H15C15.5523 19 16 18.5523 16 18V12M16 12H9C8.44772 12 8 11.5523 8 11V6C8 5.44772 8.44772 5 9 5H15C15.5523 5 16 5.44772 16 6V12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M9 19H15C15.5523 19 16 18.5523 16 18V6C16 5.44772 15.5523 5 15 5H9C8.44772 5 8 5.44772 8 6V18C8 18.5523 8.44772 19 9 19Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

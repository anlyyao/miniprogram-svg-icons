var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 18L8 6C8 5.44772 8.44772 5 9 5L15 5C15.5523 5 16 5.44772 16 6V18C16 18.5523 15.5523 19 15 19H9C8.44772 19 8 18.5523 8 18Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

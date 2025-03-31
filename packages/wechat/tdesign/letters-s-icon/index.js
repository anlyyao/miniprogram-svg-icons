var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 5H9.5C8.94772 5 8.5 5.44772 8.5 6V11C8.5 11.5523 8.94772 12 9.5 12H14.5C15.0523 12 15.5 12.4477 15.5 13V18C15.5 18.5523 15.0523 19 14.5 19H8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

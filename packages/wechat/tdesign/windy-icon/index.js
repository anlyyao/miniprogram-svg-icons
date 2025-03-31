var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 12H5.5C4.11929 12 3 10.8807 3 9.5C3 8.11929 4.11929 7 5.5 7H7M16 4H13C11.8954 4 11 4.89543 11 6C11 7.10457 11.8954 8 13 8H21M17 16H8C6.89543 16 6 16.8954 6 18C6 19.1046 6.89543 20 8 20H11.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

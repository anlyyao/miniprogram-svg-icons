var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5.88389 5.88387L9 8.99999M9 5H5V9M5.88386 18.1161L8.99998 15M5 15L5 19H9M18.1161 5.88387L15 8.99999M15 5H19V9M18.1161 18.1161L15 15M19 15V19H15" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

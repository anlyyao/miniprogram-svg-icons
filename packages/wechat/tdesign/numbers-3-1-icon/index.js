var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8.5 5H15.5V6.5L10.5 10V11H12C14.2091 11 16 12.7909 16 15C16 17.2091 14.2091 19 12 19H11.5C9.29086 19 7.5 17.2091 7.5 15" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

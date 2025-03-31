var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 9V15C8 17.2091 9.79086 19 12 19C14.2091 19 16 17.2091 16 15V9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6 12H13C15.2091 12 17 10.2091 17 8C17 5.79086 15.2091 4 13 4H6V12ZM6 12H14C16.2091 12 18 13.7909 18 16C18 18.2091 16.2091 20 14 20H6V12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

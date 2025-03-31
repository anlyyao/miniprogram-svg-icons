var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 19H8V16.976C8 16.6748 8.1357 16.3897 8.36941 16.1999L14.4983 11.2201C15.4484 10.4482 16 9.28925 16 8.06512V8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

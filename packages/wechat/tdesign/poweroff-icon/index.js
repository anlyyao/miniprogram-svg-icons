var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7 5.125C4.87867 6.67053 3.5 9.17406 3.5 11.9996C3.5 16.694 7.30558 20.4996 12 20.4996C16.6944 20.4996 20.5 16.694 20.5 11.9996C20.5 9.17406 19.1213 6.67053 17 5.125" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 3V11" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

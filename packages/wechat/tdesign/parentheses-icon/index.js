var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4.1084 5C3.07812 7.11438 2.5 9.48969 2.5 12C2.5 14.5103 3.07812 16.8856 4.1084 19M19.8916 19C20.9219 16.8856 21.5 14.5103 21.5 12C21.5 9.48969 20.9219 7.11438 19.8916 5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

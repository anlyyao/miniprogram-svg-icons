var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4142 1H3V23H21V6.58579L15.4142 1ZM14.5 7.5V3L19 7.5H14.5ZM15 10V12H13V18H11V12H9V10H15Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

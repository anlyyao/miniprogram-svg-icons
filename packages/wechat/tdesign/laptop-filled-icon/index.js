var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3H23V18H1V3ZM0 19H24V21H0V19Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

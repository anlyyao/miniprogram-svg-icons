var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3H18V21H6V3ZM1 5H4.5V19H1V17H2.5V7H1V5ZM19.5 5H23V7H21.5V17H23V19H19.5V5Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

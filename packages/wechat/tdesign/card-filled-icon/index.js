var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3H18V5H22V19H18V21H6V19H2V5H6V3ZM6 7H4V17H6V7ZM18 7V17H20V7H18Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

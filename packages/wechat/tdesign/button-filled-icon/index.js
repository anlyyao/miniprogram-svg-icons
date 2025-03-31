var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 5H22V19H2V5ZM4 7V17H20V7H4ZM6 9H18V15H6V9Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

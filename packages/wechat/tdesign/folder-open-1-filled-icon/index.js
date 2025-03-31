var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.50001 9L20.5 9L20.5 5H10.362L7.36205 2.5H0V21H20L24 11L4 11L0 21L2.50001 9Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

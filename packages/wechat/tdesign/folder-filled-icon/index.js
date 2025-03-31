var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2.5L9.48063 2.5L11.4806 5L23 5L23 21L1 21L1 2.5Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

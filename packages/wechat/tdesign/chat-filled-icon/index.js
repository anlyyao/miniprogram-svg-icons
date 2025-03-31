var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 2H22.5V18H6.87574L1.5 22.7038V2Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

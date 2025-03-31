var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3H21L14 12.8174V21H10V12.8174L3 3Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

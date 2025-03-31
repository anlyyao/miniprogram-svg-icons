var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2V22H20V2H22ZM2 2H18V22H2V2Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

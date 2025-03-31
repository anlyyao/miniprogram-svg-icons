var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 22H2V2H22V22ZM4 20H7V7H20V4H4V20Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

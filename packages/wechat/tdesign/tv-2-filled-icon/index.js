var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3H24V18H0V3ZM4 20H20V22H4V20Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

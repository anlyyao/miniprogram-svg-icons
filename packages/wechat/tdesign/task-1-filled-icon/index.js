var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H8V5H16V1Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M3 3H6V7H18V3H21V23H3V3Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

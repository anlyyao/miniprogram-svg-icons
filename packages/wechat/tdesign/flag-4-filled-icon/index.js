var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H16V3H22V17H14V16H4V22H2V2ZM16 5V15H18V5H16Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

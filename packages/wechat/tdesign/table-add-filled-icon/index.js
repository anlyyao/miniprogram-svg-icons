var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2H2V22H22V2ZM4 6V4H20V6H4ZM16 15H13V18H11V15H8V13H11V10H13V13H16V15Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

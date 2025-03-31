var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2H19V9H5V2ZM2 11H22V13H2V11ZM5 15H19V22H5V15Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

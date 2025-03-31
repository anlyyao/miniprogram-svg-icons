var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1.5V4H2V9H22V4H18V1.5H16V4H8V1.5H6Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 22V10.9995H2V22H22Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

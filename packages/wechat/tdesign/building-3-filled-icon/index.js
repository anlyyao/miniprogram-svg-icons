var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2H8V5H5V9H19V5H16V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M2 11H22V22H16V16H8V22H2V11Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M10 22V18H14V22H10Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

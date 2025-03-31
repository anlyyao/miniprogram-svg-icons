var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2V4H11V2H8Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M6 2V6H13V2H16.4142L22 7.58579V22H18V15H6V22H2V2H6Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M8 22H16V17H8V22Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

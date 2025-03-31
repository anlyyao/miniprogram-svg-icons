var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2H2V11H11V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 2H13V11H22V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M11 13H2V22H11V13Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M18.5 12.9999H16.5V16.5H13V18.5H16.5V22H18.5V18.5H22V16.5H18.5V12.9999Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

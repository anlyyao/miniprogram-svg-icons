var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2H2V11H11V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M13 2V11H22V2H13Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 13H13V22H22V13Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M11 22V13H2V22H11Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

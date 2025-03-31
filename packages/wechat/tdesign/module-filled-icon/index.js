var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2H2V22H11V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M13 22H22V13H13V22Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 11V2H13V11H22Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

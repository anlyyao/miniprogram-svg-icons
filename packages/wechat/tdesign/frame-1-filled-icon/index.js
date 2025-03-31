var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H7.33057L7.33057 22H2V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M9.33471 2H14.6653V22H9.33471V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 2H16.6694V22H22V2Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

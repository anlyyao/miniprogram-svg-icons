var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 3H2V11H22V3Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 13H2V21H22V13Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

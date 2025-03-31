var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 21H2V19H22V21Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 16H2V14H22V16Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M17 11H2V3H17V11Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

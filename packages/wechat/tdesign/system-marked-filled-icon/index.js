var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 2H1V18H12.5V13.998H3V3.99805H21V11H23V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M3 20H12.5V22H3V20Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M23 12.9961H14.5V23.2886L18.7529 20.6742L23 23.2906V12.9961Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

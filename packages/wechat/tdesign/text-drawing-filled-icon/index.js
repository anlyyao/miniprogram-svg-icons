var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 20H0V4H16V20ZM4 14H10V12H4V14ZM4 10H12V8H4V10Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M24 20H18V4H24V20Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

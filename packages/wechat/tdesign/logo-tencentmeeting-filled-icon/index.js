var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 14.1172L19.1816 18L16 14.7646L12.8184 18L9 14.1172L16 7L23 14.1172Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M11.833 9.5L4.5 16.833L1 13.333L8.33301 6L11.833 9.5Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

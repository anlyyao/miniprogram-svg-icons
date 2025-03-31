var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 9V3H1V9L23 9Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M23 11V21L1 21V11H13V16.4971L15.5 14.3338L18 16.4971V11H23Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

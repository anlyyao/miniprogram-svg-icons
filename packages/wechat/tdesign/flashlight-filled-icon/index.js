var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0H20V3H4V0Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M4 5H20V7.4141L17 10.4141V23.9999H7V10.4141L4 7.4141V5ZM13.0039 10H11V12.0039H13.0039V10Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

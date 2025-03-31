var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 2H3V6H2V8H22V6H21V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M21 10H3V20H2V22H10.5V20H9.5V15.5C9.5 14.1193 10.6193 13 12 13C13.3807 13 14.5 14.1193 14.5 15.5V20H13.5V22H22V20H21V10Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

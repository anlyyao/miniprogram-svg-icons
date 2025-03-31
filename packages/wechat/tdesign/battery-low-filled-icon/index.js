var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 5H0V19H21V5ZM6 15H4V9H6V15Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M24 15V9H22V15H24Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

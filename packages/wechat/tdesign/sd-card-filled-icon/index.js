var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 1H5V9.58579L3 11.5858V23H21V1ZM11 8H9V5H11V8ZM14 8H12V5H14V8ZM15 8V5H17V8H15Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

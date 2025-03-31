var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L13 22H11L11 2L13 2ZM2 5L9 5L9 19H2L2 5ZM15 5L22 5V19H15L15 5Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

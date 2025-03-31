var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L22 2V8L2 8L2 2ZM2 10L22 10L22 22L2 22L2 10Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

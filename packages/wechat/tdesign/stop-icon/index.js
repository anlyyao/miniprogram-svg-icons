var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8H16V16H8V8Z" fill="{{strokeColor1 || 'currentColor'}}" /></svg>`,
  },
});

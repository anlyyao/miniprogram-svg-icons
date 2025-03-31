var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 6.5L14.5 17.5L9 12L14.5 6.5Z" fill="{{strokeColor1 || 'currentColor'}}" /></svg>`,
  },
});

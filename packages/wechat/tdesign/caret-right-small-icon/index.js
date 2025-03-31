var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9999 12L9.49988 6.5L9.49988 17.5L14.9999 12Z" fill="{{strokeColor1 || 'currentColor'}}" /></svg>`,
  },
});

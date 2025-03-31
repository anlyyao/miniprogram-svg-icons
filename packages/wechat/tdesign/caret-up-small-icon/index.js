var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0001 9L17.5 14.5L6.5 14.5L12.0001 9Z" fill="{{strokeColor1 || 'currentColor'}}" /></svg>`,
  },
});

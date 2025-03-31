var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3H17V11H2V3ZM2 14H22V16H2V14ZM2 19H22V21H2V19Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

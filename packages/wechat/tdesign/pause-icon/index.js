var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11 17L11 7H8V17H11Z" fill="{{strokeColor1 || 'currentColor'}}" /><path d="M16 17L16 7H13L13 17H16Z" fill="{{strokeColor1 || 'currentColor'}}" /></g></svg>`,
  },
});

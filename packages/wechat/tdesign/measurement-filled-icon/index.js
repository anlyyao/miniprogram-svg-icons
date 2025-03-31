var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 1H6V6H9.5V8H6V11H11V13H6V16H9.5V18H6V23H18V1Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

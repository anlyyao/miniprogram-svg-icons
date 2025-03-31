var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.25 11.9998L8.5 17.6289L8.5 6.37061L18.25 11.9998Z" fill="{{strokeColor1 || 'currentColor'}}" /></svg>`,
  },
});

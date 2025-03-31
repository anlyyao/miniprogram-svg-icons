var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M19.5 3V18.5H4L19.5 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M19.4996 22L2.5 22M19.4996 3V18.5H3.99963L19.4996 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4.5L22 19.5C22 19.5 17 18 12 18C7 18 2 19.5 2 19.5L2 4.5C2 4.5 7 6 12 6C17 6 22 4.5 22 4.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 4.5L22 19.5C22 19.5 17 18 12 18C7 18 2 19.5 2 19.5L2 4.5C2 4.5 7 6 12 6C17 6 22 4.5 22 4.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

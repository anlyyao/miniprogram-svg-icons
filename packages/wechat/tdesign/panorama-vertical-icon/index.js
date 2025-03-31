var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4.5 2L19.5 2C19.5 2 18 7 18 12C18 17 19.5 22 19.5 22L4.5 22C4.5 22 6 17 6 12C6 7 4.5 2 4.5 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4.5 2L19.5 2C19.5 2 18 7 18 12C18 17 19.5 22 19.5 22L4.5 22C4.5 22 6 17 6 12C6 7 4.5 2 4.5 2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

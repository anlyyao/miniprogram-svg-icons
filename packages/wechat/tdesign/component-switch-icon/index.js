var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 12C12 14.4853 9.98528 16.5 7.5 16.5C5.01472 16.5 3 14.4853 3 12C3 9.51472 5.01472 7.5 7.5 7.5C9.98528 7.5 12 9.51472 12 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7.5 16.5H16.5C18.9853 16.5 21 14.4853 21 12C21 9.51472 18.9853 7.5 16.5 7.5H7.5M7.5 16.5C5.01472 16.5 3 14.4853 3 12C3 9.51472 5.01472 7.5 7.5 7.5M7.5 16.5C9.98528 16.5 12 14.4853 12 12C12 9.51472 9.98528 7.5 7.5 7.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

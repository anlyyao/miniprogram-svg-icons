var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.48047 2.5L9.78125 2.875L12.6807 6.5H23V21H1V2.5H9.48047Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M23 2.5V4.5H13V2.5H23Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

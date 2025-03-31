var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M9 5.5V11H21V21H3V3L9 5.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 16V21H17V16H13Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M13 16V21H17V16H13Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M9 21V11M9 21H21V11H9M9 21H3V3L9 5.5V11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

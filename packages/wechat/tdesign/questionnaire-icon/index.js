var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 3H21.5V17H6.5L2.5 20.5V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2.5 3H21.5V17H6.5L2.5 20.5V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M10 8.5C10 7.39543 10.8954 6.5 12 6.5C13.1046 6.5 14 7.39543 14 8.5C14 10.5 12.0034 10.5278 12.0034 10.75M12 13.5H12.0039V13.5039H12V13.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15 3H3V15H15V16H21V4H15V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 15H15V3H3V15ZM3 15V21M15 4H21V16H15V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 3V17.5L5.5 15H19V3H2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8.5 7.5C8.5 6.39543 9.39543 5.5 10.5 5.5C11.6046 5.5 12.5 6.39543 12.5 7.5C12.5 9.5 10.5034 9.52778 10.5034 9.75M10.5 12.5H10.5039V12.5039H10.5V12.5ZM2 17.5V3H19V15H5.5L2 17.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22.5 4.5V21L19 18.5H7.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

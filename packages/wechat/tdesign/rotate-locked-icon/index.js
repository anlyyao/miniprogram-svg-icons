var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8.49805 11.5H15.498V16H8.49805V11.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21.1679 16C19.6248 19.5318 16.1006 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12L20 10.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9.74951 11.5V9.75C9.74951 8.50736 10.7569 7.5 11.9995 7.5C13.2422 7.5 14.2495 8.50736 14.2495 9.75V11.5M8.49805 11.5H15.498V16H8.49805V11.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

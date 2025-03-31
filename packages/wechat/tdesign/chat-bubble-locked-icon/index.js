var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.6624 3.04042 17.0817 4.73686 18.8737L3 22H12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8.49805 11.5H15.498V16H8.49805V11.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.6624 3.04042 17.0817 4.73686 18.8737L3 22H12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9.74951 11.5V9.75C9.74951 8.50736 10.7569 7.5 11.9995 7.5C13.2422 7.5 14.2495 8.50736 14.2495 9.75V11.5M8.49805 11.5H15.498V16H8.49805V11.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

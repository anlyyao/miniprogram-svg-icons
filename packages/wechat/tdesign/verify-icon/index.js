var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 20V4L2 4L2 20H22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 20V4L2 4L2 20H22Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 10H8.5M6 14H8.5M12.5 15.5C12.5 13.8431 13.8431 12.5 15.5 12.5M15.5 12.5C17.1569 12.5 18.5 13.8431 18.5 15.5M15.5 12.5C16.6046 12.5 17.5 11.6046 17.5 10.5C17.5 9.39543 16.6046 8.5 15.5 8.5C14.3954 8.5 13.5 9.39543 13.5 10.5C13.5 11.6046 14.3954 12.5 15.5 12.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

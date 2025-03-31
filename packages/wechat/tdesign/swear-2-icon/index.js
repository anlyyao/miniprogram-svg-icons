var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 15.5C14 16.8807 13.1046 18 12 18C10.8954 18 10 16.8807 10 15.5C10 14.1193 10.8954 13 12 13C13.1046 13 14 14.1193 14 15.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16.8668 9.5L15.1348 10.5M8.86682 10.5L7.13477 9.5M14 15.5C14 16.8807 13.1046 18 12 18C10.8954 18 10 16.8807 10 15.5C10 14.1193 10.8954 13 12 13C13.1046 13 14 14.1193 14 15.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

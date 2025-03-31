var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 13V4L19 4.00084V13C19 13 16.5 10 12 10C7.5 10 5 13 5 13Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5 4H1V20.0004H5V4ZM5 4L19 4.00084M19 4.00084H23V20.0013H19V4.00084ZM5.5 12.4954C6.43804 11.6407 8.67212 10 12 10C15.3279 10 17.562 11.6407 18.5 12.4954" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M1 20.0004V4H5V20.0004H1Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M23 20.0014V4.00098H19V20.0014H23Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

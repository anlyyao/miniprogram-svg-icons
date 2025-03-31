var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1 18C1 11.9249 5.92487 7 12 7C18.0751 7 23 11.9249 23 18V19H1V18Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6.11656 8.70397L4 5M6.11656 8.70397C3.04126 10.6544 1 14.0888 1 18V19H23V18C23 14.0888 20.9587 10.6544 17.8834 8.70397M6.11656 8.70397C7.81804 7.62485 9.83605 7 12 7C14.164 7 16.182 7.62485 17.8834 8.70397M17.8834 8.70397L20 5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M7 14H7.00391V14.0039H7V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 14H17.0039V14.0039H17V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

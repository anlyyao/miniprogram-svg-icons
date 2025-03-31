var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H21V12H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21.5 18.25C21.5 19.7688 20.2688 21 18.75 21C17.2312 21 16 19.7688 16 18.25C16 16.7312 17.2312 15.5 18.75 15.5C20.2688 15.5 21.5 16.7312 21.5 18.25Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 12H21V3H3V12ZM3 12L3 21.0004H12.5M3 12V11.998M6.99805 7.5H7.00195V7.50391H6.99805V7.5ZM6.99805 16.5H7.00195V16.5039H6.99805V16.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22.25 21.75L20.6945 20.1945M21.5 18.25C21.5 19.7688 20.2688 21 18.75 21C17.2312 21 16 19.7688 16 18.25C16 16.7312 17.2312 15.5 18.75 15.5C20.2688 15.5 21.5 16.7312 21.5 18.25Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

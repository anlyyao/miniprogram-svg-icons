var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M9 7H3V12.5H9L15 15V4L9 7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 21V12.5H7L6 21H3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 12.5V7H9L15 4V15L9 12.5H3ZM3 12.5V21H6L7 12.5H3ZM6.85 16H8.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18.25 8.66895C18.9403 9.35927 18.9403 10.4785 18.25 11.1688M20.3335 7C21.7142 8.38066 21.7142 11.453 20.3335 12.8336" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

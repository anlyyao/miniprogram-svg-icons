var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 4.6L12 3L8 4.6V21H16V4.6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21V16M22 9V21H16V9H22ZM8 21H2V9H8V21ZM12 7.99805H12.0039V8.00195H12V7.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16 5.1V21H8V5.1M17 5L12 3L7 5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M22 21V9H16V21H22Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 21H8V9H2V21Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

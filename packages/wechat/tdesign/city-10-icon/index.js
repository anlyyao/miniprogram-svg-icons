var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21V4.5L13 2V21H3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 11H13V21H21V11Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M17 16V21M7 8.99805H7.00391V9.00195H7V8.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M13 21H3V4.5L13 2V21ZM13 21H21V11H13V21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

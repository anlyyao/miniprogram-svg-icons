var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 22H20V8H14V2H4V22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M8 6H8.00391V6.00391H8V6Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10 4H10.0039V4.00391H10V4Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10 8H10.0039V8.00391H10V8Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M8 10H8.00391V10.0039H8V10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M8 14H8.00391V14.0039H8V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10 12H10.0039V12.0039H10V12Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M10 5C10 6.10457 9.10457 7 8 7C6.89543 7 6 6.10457 6 5C6 3.89543 6.89543 3 8 3C9.10457 3 10 3.89543 10 5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10 19C10 20.1046 9.10457 21 8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 12C14 13.1046 14.8954 14 16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M21 5L10 5M10 5C10 6.10457 9.10457 7 8 7C6.89543 7 6 6.10457 6 5M10 5C10 3.89543 9.10457 3 8 3C6.89543 3 6 3.89543 6 5M6 5L3 5M21 19H10M10 19C10 20.1046 9.10457 21 8 21C6.89543 21 6 20.1046 6 19M10 19C10 17.8954 9.10457 17 8 17C6.89543 17 6 17.8954 6 19M3 12H14M14 12C14 13.1046 14.8954 14 16 14C17.1046 14 18 13.1046 18 12M14 12C14 10.8954 14.8954 10 16 10C17.1046 10 18 10.8954 18 12M6 19H3M18 12H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

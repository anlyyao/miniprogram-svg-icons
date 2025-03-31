var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 7.5C16 9.98528 13.9853 12 11.5 12C9.01472 12 7 9.98528 7 7.5C7 5.01472 9.01472 3 11.5 3C13.9853 3 16 5.01472 16 7.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14.4985 17H21.4985V21.5H14.4985V17Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M10.5 15H8C5.23858 15 3 17.2386 3 20V21H10.5508M16 7.5C16 9.98528 13.9853 12 11.5 12C9.01472 12 7 9.98528 7 7.5C7 5.01472 9.01472 3 11.5 3C13.9853 3 16 5.01472 16 7.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15.75 17V15.25C15.75 14.0074 16.7574 13 18 13C18.6188 13 19.1793 13.2498 19.5861 13.6541M14.4985 17H21.4985V21.5H14.4985V17Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

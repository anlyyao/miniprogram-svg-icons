var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 7.5C16 9.98528 13.9853 12 11.5 12C9.01472 12 7 9.98528 7 7.5C7 5.01472 9.01472 3 11.5 3C13.9853 3 16 5.01472 16 7.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11.75 15H8C5.23858 15 3 17.2386 3 20V21H11.8008M16 7.5C16 9.98528 13.9853 12 11.5 12C9.01472 12 7 9.98528 7 7.5C7 5.01472 9.01472 3 11.5 3C13.9853 3 16 5.01472 16 7.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14.5 18.0439L18 21.5041L21.5 18.0439M18 20.5V13" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 7.5C16 9.98528 13.9853 12 11.5 12C9.01472 12 7 9.98528 7 7.5C7 5.01472 9.01472 3 11.5 3C13.9853 3 16 5.01472 16 7.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11.75 15H8C5.23858 15 3 17.2386 3 20V21H11.8008M16 7.5C16 9.98528 13.9853 12 11.5 12C9.01472 12 7 9.98528 7 7.5C7 5.01472 9.01472 3 11.5 3C13.9853 3 16 5.01472 16 7.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15.5 15.2489C15.5 14.0069 16.6193 13 18 13C19.3807 13 20.5 14.0069 20.5 15.2489C20.5 15.8593 20.2296 16.413 19.7907 16.8182L18 18.5073V18.6223M17.9991 21.9961H18.003V22H17.9991V21.9961Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

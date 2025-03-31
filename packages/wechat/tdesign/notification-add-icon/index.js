var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 19H21V16L19 13V8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8V13L3 16V19Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 22.5C13.933 22.5 15.5 20.933 15.5 19H8.5C8.5 20.933 10.067 22.5 12 22.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 10H12M12 10L9 10M12 10L12 7M12 10V13" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M5 8V13L3 16V19H21V16L19 13V8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8.5 19H15.5C15.5 20.933 13.933 22.5 12 22.5C10.067 22.5 8.5 20.933 8.5 19Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

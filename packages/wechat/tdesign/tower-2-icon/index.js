var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M10 4L12 2L14 4L15 19H9L10 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 22V19H16V22H8Z" fill="{{fillColor2 || 'transparent'}}" /><g><path d="M10 4L12 2L14 4L15 19H9L10 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M8 22V19H16V22H8Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

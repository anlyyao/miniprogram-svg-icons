var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 2L20 22L4 22L4 2L20 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 2L12 2L12 7.5L14 6L16 7.5L16 2Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M16 2L12 2L12 7.5L14 6L16 7.5L16 2Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M20 2V22H4L4 2L20 2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

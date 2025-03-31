var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6 2H5.5L1.5 14L12 22L22.5 14L18.5 2H18L15.5 9.33333H8.5L6 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6 2H5.5L1.5 14L12 22L22.5 14L18.5 2H18L15.5 9.33333H8.5L6 2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

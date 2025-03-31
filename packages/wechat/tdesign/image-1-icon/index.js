var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.5 17L9 10L2 21H22L16 13L13.5 17Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13.5 17L9 10L2 21H22L16 13L13.5 17Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><circle cx="17" cy="6" r="3" fill="{{fillColor2 || 'transparent'}}" /><circle cx="17" cy="6" r="3" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

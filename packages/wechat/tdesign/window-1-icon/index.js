var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 5L12 2V18L21 21V5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 4V21H21L12 18V10V4H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M12 10V18L21 21V13M12 10L16.5 11.5L21 13M12 10V2L21 5V13" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

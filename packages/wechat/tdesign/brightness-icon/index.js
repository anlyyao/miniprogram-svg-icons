var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4.57537 8.92462L1.5 12L4.57537 15.0754V19.4246H8.92462L12 22.5L15.0754 19.4246H19.4246V15.0754L22.5 12L19.4246 8.92462V4.57538H15.0754L12 1.5L8.92462 4.57538H4.57537V8.92462Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4.57537 8.92462L1.5 12L4.57537 15.0754V19.4246H8.92462L12 22.5L15.0754 19.4246H19.4246V15.0754L22.5 12L19.4246 8.92462V4.57538H15.0754L12 1.5L8.92462 4.57538H4.57537V8.92462Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><circle cx="12" cy="12" r="5" fill="{{fillColor2 || 'transparent'}}" /><circle cx="12" cy="12" r="5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

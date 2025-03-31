var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15.0008 22.5L15 19.7866L19.2866 15.5L22 18.2134L17.7134 22.5H15.0008Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 10V21H11M3 10H21M3 10V5H21V10M21 10V12M7 5V2M17 5V2" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17.2006 17.586L15 19.7866L15.0008 22.5H17.7134L19.914 20.2994M17.2006 17.586L19.2866 15.5L22 18.2134L19.914 20.2994M17.2006 17.586L19.914 20.2994" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

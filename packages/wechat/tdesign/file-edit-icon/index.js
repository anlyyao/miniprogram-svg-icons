var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.5008 22.5L13.5 19.7866L19.7866 13.5L22.5 16.2134L16.2134 22.5H13.5008Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M20 10V7L15 2H4V22H9.5M14 2V8H20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17.4506 15.836L13.5 19.7866L13.5008 22.5H16.2134L20.164 18.5494M17.4506 15.836L19.7866 13.5L22.5 16.2134L20.164 18.5494M17.4506 15.836L20.164 18.5494" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

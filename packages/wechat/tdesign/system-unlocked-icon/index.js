var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 16.5H23V21H16V16.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 9V3H2V17H12M4 21H12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17.2515 16.5V14.75C17.2515 13.5074 18.2588 12.5 19.5015 12.5C20.1203 12.5 20.6808 12.7498 21.0875 13.1541M16 16.5H23V21H16V16.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

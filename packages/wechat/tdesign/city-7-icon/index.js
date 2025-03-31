var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 21V11H9V21H21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 3V11H9V21H3V3H13Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 17V21M13 11V3H3V21H9V11H13Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 21V11H9V21H21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

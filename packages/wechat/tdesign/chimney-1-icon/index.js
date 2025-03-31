var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 21V11H9V21H21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 21H9V11H11.4444L11 7L12 3H3L4 7L3 21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 17V21M4 7H11M4 7L3 21H9V11H11.4444L11 7M4 7L3 3H12L11 7" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 21V11H9V21H21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

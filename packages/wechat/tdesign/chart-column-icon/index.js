var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M18 9V5L3 5L3 9L18 9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 17V13L3 13L3 17L14 17Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M18 9V5L3 5L3 9L18 9Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14 17V13L3 13L3 17L14 17Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><path d="M3 3L3 21H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

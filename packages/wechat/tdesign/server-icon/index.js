var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M21 14V21H3L3 14L21 14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3V10L3 10L3 3L21 3Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M21 14V21H3L3 14L21 14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 3V10L3 10L3 3L21 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6.5 6.5H6.50391V6.50391H6.5V6.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6.5 17.5H6.50391V17.5039H6.5V17.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

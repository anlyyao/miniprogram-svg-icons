var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 10L12 2.5L21 10V21H3V10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 14H15V21H9V14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9 14H15V21H9V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 10L12 2.5L21 10V21H3V10Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

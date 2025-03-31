var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M6.5 15L6.5 5L2.5 5L2.5 15H6.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 15L14 5L10 5V15L14 15Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21.5 15V5L17.5 5L17.5 15H21.5Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M6.5 15L6.5 5L2.5 5L2.5 15H6.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M14 15L14 5L10 5V15L14 15Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M21.5 15V5L17.5 5L17.5 15H21.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g><path d="M2.5 19L21.5 19" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

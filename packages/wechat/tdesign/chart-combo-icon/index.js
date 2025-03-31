var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M15 12H19V21H15V12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7 15H11V21H7V15Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M19.8318 8.29949L16.6709 5.13867L9.88902 11.8783L6.70703 8.6963M15 12H19V21H15V12ZM7 15H11V21H7V15Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 21H3V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

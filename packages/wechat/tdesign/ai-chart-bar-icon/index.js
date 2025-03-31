var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M15 12H19V21H15V12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7 6H11V21H7V6Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M21 21H3V3M15 12H19V21H15V12ZM7 6H11V21H7V6Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19.25 3L19.7697 4.23028L21 4.75L19.7697 5.26972L19.25 6.5L18.7303 5.26972L17.5 4.75L18.7303 4.23028L19.25 3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

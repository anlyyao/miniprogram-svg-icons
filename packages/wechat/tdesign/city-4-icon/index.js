var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 21V10L12 8L8 10V21H16Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11 13H13M12 21V17" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 21H3V5L5.5 3L8 5V21ZM8 21H16M16 21H21V5L18.5 3L16 5V21ZM8.5 9.75L12 8L15.5 9.75" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M3 21H8V5L5.5 3L3 5V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 21V5L18.5 3L16 5V21H21Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

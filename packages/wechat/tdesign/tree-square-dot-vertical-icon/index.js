var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M16 8V3L21 3V8H16Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 21V16H21V21H16Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 14.5L3 9.5H8V14.5H3Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M8 12H12.3333M12.3333 12L12.3333 18.5H16M12.3333 12V5.5L16 5.5M16 8V3L21 3V8H16ZM16 21V16H21V21H16ZM3 14.5L3 9.5H8V14.5H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

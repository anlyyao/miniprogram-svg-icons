var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M9.5 3H14.5V8H9.5V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 16H21V21H16V16Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 16H8V21H3V16Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M12 8V12.3333M12 12.3333H5.5V16M12 12.3333H18.5V16M9.5 3H14.5V8H9.5V3ZM16 16H21V21H16V16ZM3 16H8V21H3V16Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

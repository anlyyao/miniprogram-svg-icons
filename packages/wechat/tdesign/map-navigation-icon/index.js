var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.9999 12L10.0002 20.9989L7.93799 17.0619L4.00098 14.9996L12.9999 12Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 6L3 6M19 20V3M21 16H17M7 3V10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12.9999 12L10.0002 20.9989L7.93799 17.0619L4.00098 14.9996L12.9999 12Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

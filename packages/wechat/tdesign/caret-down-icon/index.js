var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.0001 16.5L19 9.5L5 9.5L12.0001 16.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12.0001 16.5L19 9.5L5 9.5L12.0001 16.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

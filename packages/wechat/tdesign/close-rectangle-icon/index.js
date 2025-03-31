var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 3H3V21H21V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3H3V21H21V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14.8287 9.17157L12.0003 12M12.0003 12L9.17188 14.8284M12.0003 12L9.17188 9.17157M12.0003 12L14.8287 14.8284" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

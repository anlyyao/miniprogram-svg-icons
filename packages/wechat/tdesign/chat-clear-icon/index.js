var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 3L21.5 3V17H6.5L2.5 20.5L2.5 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2.5 3L21.5 3V17H6.5L2.5 20.5L2.5 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14.8287 7.17157L12.0003 10M12.0003 10L9.17188 12.8284M12.0003 10L14.8287 12.8284M12.0003 10L9.17188 7.17157" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

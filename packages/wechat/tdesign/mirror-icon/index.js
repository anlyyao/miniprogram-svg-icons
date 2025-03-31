var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M8 8.5V17.5H3L8 8.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 8.5V17.5H21L16 8.5Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M8 8.5V17.5H3L8 8.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16 8.5V17.5H21L16 8.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><path d="M12 3L12 21" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

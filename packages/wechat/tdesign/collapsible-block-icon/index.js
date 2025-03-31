var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M4 3L6 5L8 3H4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M19 5L17 3L15 5L19 5Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M4 3L6 5L8 3H4Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19 5L17 3L15 5L19 5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><path d="M3 11H13M3 16H21M3 21H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 9V3H20V9V21H15V9H9V21H4V9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 9V3H20V9M4 9V21M4 9H9M4 21H3M4 21H9M20 9V21M20 9H15M20 21H21M20 21H15M9 9V21M9 9H15M9 21H10M15 9V21M15 21H14" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 21V9H20V21H4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5 4H19L20 9H4L5 4Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M19 4H5M19 4L20 9M19 4H20M19 4V3M5 4L4 9M5 4H4M5 4V3M4 9V21M4 9H3M4 9H9M4 21H3M4 21H9M20 9V21M20 9H21M20 9H15M20 21H21M20 21H15M9 21V9M9 21H15M9 9H15M15 9V21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

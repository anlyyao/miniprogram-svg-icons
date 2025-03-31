var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21H20L9 10L3 16V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 16V3H21V21H20M3 16V21H20M3 16L9 10L20 21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><circle cx="15.75" cy="8.25" r="2" fill="{{fillColor2 || 'transparent'}}" /><circle cx="15.75" cy="8.25" r="2" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

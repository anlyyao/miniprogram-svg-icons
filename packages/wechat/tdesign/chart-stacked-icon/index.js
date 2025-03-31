var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M7 21H11V15.5H7V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 21H19V15.5H15V21Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M19 21H15M19 21V6H15V21M19 21V15.5H15V21M11 21H7M11 21V10H7V21M11 21V15.5H7V21" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 21H3V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

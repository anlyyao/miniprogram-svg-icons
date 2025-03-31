var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M9 4H15V20H9V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 20V4H9V20M15 20H9M15 20V12H21V20H15ZM9 20V10H3V20H9Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M15 12H21V20H15V12Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 10H9V20H3V10Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

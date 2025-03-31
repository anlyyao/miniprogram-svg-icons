var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M3 4H21V10H3V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 14H21V20H3V14Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M3 4H21V10H3V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 14H21V20H3V14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

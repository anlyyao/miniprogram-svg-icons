var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M21 4H3V10H21V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 14H3V20H21V14Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M21 4H3V10H21V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M21 14H3V20H21V14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

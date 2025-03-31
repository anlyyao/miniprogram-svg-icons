var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M3 14H10V21H3V14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 14H21V21H14V14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 3H10V10H3V3Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M3 14H10V21H3V14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M14 14H21V21H14V14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 3H10V10H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g><path d="M18 3.75L18.7 5.29996L20.25 6L18.7 6.70004L18 8.25L17.3 6.70004L15.75 6L17.3 5.29996L18 3.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

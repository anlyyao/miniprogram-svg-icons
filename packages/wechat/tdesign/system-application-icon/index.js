var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 14H21V21H3V14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 3H21V10H3V3Z" fill="{{fillColor2 || 'transparent'}}" /><g><path d="M6.50391 6.5V6.50391H6.5V6.5H6.50391Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10.5039 6.5V6.50391H10.5V6.5H10.5039Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M6.50391 17.5V17.5039H6.5V17.5H6.50391Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10.5039 17.5V17.5039H10.5V17.5H10.5039Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 14H21V21H3V14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 3H21V10H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M3 3H10V10H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 14H21V21H14V14Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 14H10V21H3V14Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M3 3H10V10H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M14 14H21V21H14V14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 14H10V21H3V14Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g><path d="M21.5 6.5C21.5 8.70914 19.7091 10.5 17.5 10.5C15.2909 10.5 13.5 8.70914 13.5 6.5C13.5 4.29086 15.2909 2.5 17.5 2.5C19.7091 2.5 21.5 4.29086 21.5 6.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21.5 6.5C21.5 8.70914 19.7091 10.5 17.5 10.5C15.2909 10.5 13.5 8.70914 13.5 6.5C13.5 4.29086 15.2909 2.5 17.5 2.5C19.7091 2.5 21.5 4.29086 21.5 6.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

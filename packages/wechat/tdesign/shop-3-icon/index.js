var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H21C21 9 21 15 21 21H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 3H21C21 9 21 15 21 21H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M15 14H9V21H15V14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 6C3 7.65685 4.34315 9 6 9C7.65685 9 9 7.65685 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 7.65685 16.3431 9 18 9C19.6569 9 21 7.65686 21 6V3H3V6Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M15 14H9V21H15V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 6C3 7.65685 4.34315 9 6 9C7.65685 9 9 7.65685 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 7.65685 16.3431 9 18 9C19.6569 9 21 7.65685 21 6V3H3V6Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 17H21V21H15V17Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 10H21V14H15V10Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M6 9V19H15M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9ZM6 12H15M15 17H21V21H15V17ZM15 10H21V14H15V10Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21C7.65686 21 9 19.6569 9 18C9 16.3431 7.65686 15 6 15Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6 3C4.34315 3 3 4.34314 3 6C3 7.65685 4.34315 9 6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65686 3 6 3Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M6 15V9M6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21C7.65686 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15ZM6 9C4.34315 9 3 7.65685 3 6C3 4.34314 4.34315 3 6 3C7.65686 3 9 4.34315 9 6C9 7.65685 7.65685 9 6 9Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 12L13 12M18 5L13 5M18 19H13" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

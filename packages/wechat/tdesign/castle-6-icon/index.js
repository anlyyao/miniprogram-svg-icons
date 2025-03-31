var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 9H21V21H3V9H8V3H16V9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M18 13C19.6569 13 21 14.3431 21 16V21H3V16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16C15 14.3431 16.3431 13 18 13Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 7V9M9 21V16M9 21H3V16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16M9 21H15M9 16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16M15 21V16M15 21H21V16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 3H17M8 9V3H16V9H8ZM3 9H21V21H3V9Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

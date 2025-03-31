var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 11V3H3V21H16M12.5 13.5L9 10L3.5 15.5M17.75 8.25C17.75 9.35457 16.8546 10.25 15.75 10.25C14.6454 10.25 13.75 9.35457 13.75 8.25C13.75 7.14543 14.6454 6.25 15.75 6.25C16.8546 6.25 17.75 7.14543 17.75 8.25Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20 15V22M20 15H17M20 15H23" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

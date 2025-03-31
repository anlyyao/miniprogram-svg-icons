var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 11V3H3V21H11M13 14L9 10L3.5 15.5M17.75 8.25C17.75 9.35457 16.8546 10.25 15.75 10.25C14.6454 10.25 13.75 9.35457 13.75 8.25C13.75 7.14543 14.6454 6.25 15.75 6.25C16.8546 6.25 17.75 7.14543 17.75 8.25Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21.8287 16.1719L19.0003 19.0003M19.0003 19.0003L16.1719 21.8287M19.0003 19.0003L16.1719 16.1719M19.0003 19.0003L21.8287 21.8287" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

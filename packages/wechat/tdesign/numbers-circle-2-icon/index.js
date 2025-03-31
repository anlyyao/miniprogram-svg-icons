var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="12" r="10" fill="{{fillColor1 || 'transparent'}}" /><circle cx="12" cy="12" r="10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 17.5H9V16.0157C9 15.7949 9.10177 15.5858 9.27706 15.4466L13.8737 11.7948C14.5863 11.2287 15 10.3788 15 9.48109V9.43333C15 7.8133 13.6569 6.5 12 6.5C10.3431 6.5 9 7.8133 9 9.43333" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

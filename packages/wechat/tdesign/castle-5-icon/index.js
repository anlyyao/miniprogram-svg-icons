var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17 21V11H15L12 9L9 11H7V21H17Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 4V21H17M21 4H15M21 4V3M15 4V10.5M15 4V3M7 21H3V4M9 4H3M9 4V10.5M9 4V3M3 4V3M12 21V16" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 21V11H15L12 9L9 11H7V21H17Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M3 21H7V11H9V4H3V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 21V4H15V11H17V21H21Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

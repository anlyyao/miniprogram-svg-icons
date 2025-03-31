var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 4C14.7614 4 17 6.23858 17 9H20V21H4V9H7C7 6.23858 9.23858 4 12 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 21V15H15V21H9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9 21V15H15V21H9Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4 9V21H20V9M4 9H3M4 9H7M20 9H21M20 9H17M7 9H17M7 9C7 6.23858 9.23858 4 12 4M17 9C17 6.23858 14.7614 4 12 4M12 4L12.002 3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

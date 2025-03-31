var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 4C14.7614 4 17 6.23858 17 9V21H7V9C7 6.23858 9.23858 4 12 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21V16M22 14V21H17V10H18C20.2091 10 22 11.7909 22 14ZM7 21H2V14C2 11.7909 3.79086 10 6 10H7V21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 4C9.23858 4 7 6.23858 7 9H17C17 6.23858 14.7614 4 12 4ZM12 4V3M7 9.85V21H17V9.85" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M22 21V14C22 11.7909 20.2091 10 18 10H17V21H22Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 21H7V10H6C3.79086 10 2 11.7909 2 14V21Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

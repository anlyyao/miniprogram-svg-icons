var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21V10H7V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10H21V21H3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 21V18.3541C9 16.2985 10.1614 14.4193 12 13.5C13.8386 14.4193 15 16.2985 15 18.3541V21H9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7 10V9C7 6.23858 9.23858 4 12 4M7 10H17M7 10H3M17 10V9C17 6.23858 14.7614 4 12 4M17 10H21M3 10V21H21V10M3 10V4M21 10V4M12 4L12.002 3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M11.998 6.99805H12.002V7.00195H11.998V6.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 21V18.3541C9 16.2985 10.1614 14.4193 12 13.5C13.8386 14.4193 15 16.2985 15 18.3541V21H9Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

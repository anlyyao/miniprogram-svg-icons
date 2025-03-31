var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14 18.5C14 20.9853 16.0147 23 18.5 23C20.9853 23 23 20.9853 23 18.5C23 16.0147 20.9853 14 18.5 14C16.0147 14 14 16.0147 14 18.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M19.5 11H4.5V21H10.5M10 16H10.5M17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11H17Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18.5 17.252V18.4999L19.5 19.5M18.5 23C16.0147 23 14 20.9853 14 18.5C14 16.0147 16.0147 14 18.5 14C20.9853 14 23 16.0147 23 18.5C23 20.9853 20.9853 23 18.5 23Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

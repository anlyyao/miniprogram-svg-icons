var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C16.4183 2 20 5.58172 20 10C20 16.5 12 22 12 22C12 22 4 16.4992 4 10C4 5.58172 7.58172 2 12 2ZM12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 10C20 16.5 12 22 12 22C12 22 4 16.4992 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

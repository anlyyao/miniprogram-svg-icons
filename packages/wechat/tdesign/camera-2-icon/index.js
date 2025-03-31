var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 10.5C20 14.9183 16.4183 18.5 12 18.5C7.58172 18.5 4 14.9183 4 10.5C4 6.08172 7.58172 2.5 12 2.5C16.4183 2.5 20 6.08172 20 10.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 10.5C15 12.1569 13.6569 13.5 12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 18.5C16.4183 18.5 20 14.9183 20 10.5C20 6.08172 16.4183 2.5 12 2.5C7.58172 2.5 4 6.08172 4 10.5C4 14.9183 7.58172 18.5 12 18.5ZM12 18.5V21.5M18.3261 20C16.5368 21.2601 14.3548 22 12 22C9.64517 22 7.46318 21.2601 5.67383 20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 10.5C15 12.1569 13.6569 13.5 12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

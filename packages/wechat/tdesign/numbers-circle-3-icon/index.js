var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="12" r="10" fill="{{fillColor1 || 'transparent'}}" /><circle cx="12" cy="12" r="10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9.32353 7.5H15.0882V8.57143L10.9706 11.0714V11.7857H12.2059C14.0252 11.7857 15.5 13.0649 15.5 14.6429C15.5 16.2208 14.0252 17.5 12.2059 17.5H11.7941C9.97483 17.5 8.5 16.2208 8.5 14.6429" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

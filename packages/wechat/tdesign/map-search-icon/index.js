var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 16.25C21 18.3211 19.3211 20 17.25 20C15.1789 20 13.5 18.3211 13.5 16.25C13.5 14.1789 15.1789 12.5 17.25 12.5C19.3211 12.5 21 14.1789 21 16.25Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 6.5L9 3L3 6.5V20L9 17.5M15 6.5L21 4V9.5M15 6.5V9.5M9 17.5V3.5M9 17.5L10.5 18.375" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19.9036 18.8997L21.5 20.5M21 16.25C21 18.3211 19.3211 20 17.25 20C15.1789 20 13.5 18.3211 13.5 16.25C13.5 14.1789 15.1789 12.5 17.25 12.5C19.3211 12.5 21 14.1789 21 16.25Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

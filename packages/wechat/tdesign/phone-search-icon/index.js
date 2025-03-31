var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 17.25C21 19.3211 19.3211 21 17.25 21C15.1789 21 13.5 19.3211 13.5 17.25C13.5 15.1789 15.1789 13.5 17.25 13.5C19.3211 13.5 21 15.1789 21 17.25Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M11.5 22H5V2H19V10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19.9036 19.8997L21.5 21.5M21 17.25C21 19.3211 19.3211 21 17.25 21C15.1789 21 13.5 19.3211 13.5 17.25C13.5 15.1789 15.1789 13.5 17.25 13.5C19.3211 13.5 21 15.1789 21 17.25Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

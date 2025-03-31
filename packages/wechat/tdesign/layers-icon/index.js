var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4.5 6.125L12 3L19.5 6.125L12 9.25L4.5 6.125Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4.5 6.125L12 3L19.5 6.125L12 9.25L4.5 6.125Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 11.5005L12 15.3771L21 11.5005M21 17.5005L12 21.3771L3 17.5005" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

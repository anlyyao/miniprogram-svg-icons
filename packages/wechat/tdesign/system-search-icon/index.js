var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 17.75C22 19.8211 20.3211 21.5 18.25 21.5C16.1789 21.5 14.5 19.8211 14.5 17.75C14.5 15.6789 16.1789 14 18.25 14C20.3211 14 22 15.6789 22 17.75Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 11V3H2V17H11M4 21H11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20.9036 20.3997L22.5 22M22 17.75C22 19.8211 20.3211 21.5 18.25 21.5C16.1789 21.5 14.5 19.8211 14.5 17.75C14.5 15.6789 16.1789 14 18.25 14C20.3211 14 22 15.6789 22 17.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

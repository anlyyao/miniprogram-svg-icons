var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M3 11V6.15152L10 5V11H3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 11V4.14286L21 3V11H13Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 19.8333V14H21V21L13 19.8333Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 19.3333V14H10V20L3 19.3333Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M3 11V6.15152L10 5V11H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M13 11V4.14286L21 3V11H13Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M13 19.8333V14H21V21L13 19.8333Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 19.3333V14H10V20L3 19.3333Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

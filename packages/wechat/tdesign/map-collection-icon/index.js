var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18 12.5L19.587 14.8157L22.2797 15.6094L20.5678 17.8343L20.645 20.6406L18 19.7L15.3549 20.6406L15.4321 17.8343L13.7202 15.6094L16.4129 14.8157L18 12.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 6.5L9 3L3 6.5V20L9 17.5M15 6.5L21 4V9.5M15 6.5V9.5M9 17.5V3.5M9 17.5L10.5 18.375" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18 12.5L19.587 14.8157L22.2797 15.6094L20.5678 17.8343L20.645 20.6406L18 19.7L15.3549 20.6406L15.4321 17.8343L13.7202 15.6094L16.4129 14.8157L18 12.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

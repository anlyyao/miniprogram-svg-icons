var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H12H21V6H17.9492H12H6H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 6V11M12 6H3V3H21V6H12ZM12 11H3M12 11H21M4 22L5.9375 6.5M20 22L18.0132 6.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H16L21 8V21H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 3H16L21 8V21H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M12 3H7V7H12V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7 21H17V15H7V21Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M12 3H7V7H12V3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M7 21H17V15H7V21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

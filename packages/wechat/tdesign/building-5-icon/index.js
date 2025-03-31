var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 21V12.8889L12 8L20 12.8889V21H4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6 11.6667V5.85699L11.9984 2L18 5.85729V11.6667L12 8L6 11.6667Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 17V21M19 6.5L11.9984 2L5 6.5M6 6.35V11.6667L12 7.99999L18 11.6667V6.3503" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 13.5L12 8L21 13.5M4 13.4V21H20V13.4" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

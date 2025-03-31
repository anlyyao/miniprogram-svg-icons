var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 7L12 2L21 7V8H3V7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 22H3M6 12V18M12 12V18M18 12V18M3 7V8H21V7L12 2L3 7Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

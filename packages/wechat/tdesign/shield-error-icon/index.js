var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.65L3 12C3 19.35 12 22.5 12 22.5C12 22.5 21 19.35 21 12L21 4.65L12 1.5L3 4.65Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.65L3 12C3 19.35 12 22.5 12 22.5C12 22.5 21 19.35 21 12L21 4.65L12 1.5L3 4.65Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 15.5L12 11M12 7.5L11.9961 7.5L11.9961 7.49609L12 7.49609L12 7.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

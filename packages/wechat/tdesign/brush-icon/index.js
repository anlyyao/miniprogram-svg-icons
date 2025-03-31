var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M10.5 2.5L7 6L18 17L21.5 13.5L18 10L21 7L17 3L14 6L10.5 2.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M1.5 11.5L12.5 22.5L18 17L7 6L1.5 11.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7 6L18 17M7 6L1.5 11.5L12.5 22.5L18 17M7 6L10.5 2.5L14 6L17 3L21 7L18 10L21.5 13.5L18 17" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

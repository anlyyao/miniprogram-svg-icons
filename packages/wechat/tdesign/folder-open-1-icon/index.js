var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1 3.5V20L4 10L19.5 10L19.5 6L10 6L7 3.5H1Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M1 20L19.5 20L22.5 10L4 10L1 20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M1 20H19.5L22.5 10H4L1 20ZM1 20L1 3.5L7 3.5L10 6L19.5 6L19.5 10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

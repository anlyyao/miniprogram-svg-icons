var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 13.9961H15.5V21.5L18.7535 19.5L22 21.5V13.9961Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 10V3H2V17H11.5M4 21H11.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 13.9961H15.5V21.5L18.7535 19.5L22 21.5V13.9961Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

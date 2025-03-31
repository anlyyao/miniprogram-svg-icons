var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21.25 12.9961H14.75V20.5L18.0035 18.5L21.25 20.5V12.9961Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 6.5L9 3L3 6.5V20L9 17.5M15 6.5L21 4V9M15 6.5V9M9 17.5V3.5M9 17.5L10.5 18.375" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21.25 12.9961H14.75V20.5L18.0035 18.5L21.25 20.5V12.9961Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

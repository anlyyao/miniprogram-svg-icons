var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.25 13.9961H15.75V21.5L19.0035 19.5L22.25 21.5V13.9961Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M8 6V4H4V22H11.5M8 6H16M8 6V2H16V6M16 6V4H20V10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22.25 13.9961H15.75V21.5L19.0035 19.5L22.25 21.5V13.9961Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

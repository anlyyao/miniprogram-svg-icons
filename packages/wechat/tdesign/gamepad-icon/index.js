var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 4H21L22 20H17L16 17H8L7 20H2L3 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 4H21L22 20H17L16 17H8L7 20H2L3 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M10 10.5L8 10.5M8 10.5L6 10.5M8 10.5V8.5M8 10.5L8 12.5M17 8.5H17.0039V8.50391H17V8.5ZM17 12.4961H17.0039V12.5H17V12.4961Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

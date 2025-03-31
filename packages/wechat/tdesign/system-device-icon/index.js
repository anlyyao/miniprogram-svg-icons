var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 8.58789H8.5H12V20.9997H3V8.58789Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21V8.58824H8.5V3H21V21H12Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 21V8.58824H8.5V3H21V21H12Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 17H8M3 8.58789V20.9997H12V8.58789H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

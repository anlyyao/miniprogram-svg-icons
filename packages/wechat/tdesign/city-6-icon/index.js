var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17 3H7V21H17V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21V16M7 21H2V9H7V21ZM22 7V21H17V7H22Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 3H7V21H17V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M2 21H7V9H2V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 21V7H17V21H22Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M17 21V11H7V21H17Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21V16M21 6V21H17V11H15V6H21ZM7 21H3V3H9V11H7V21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 21V11H7V21H17Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M21 21V6H15V11H17V21H21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 21H7V11H9V3H3V21Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

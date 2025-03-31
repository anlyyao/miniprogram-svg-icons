var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 3H8V21H16V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21V16M22 9V21H16V9H22ZM8 21H2V9H8V21ZM12 6.99805H12.0039V7.00195H12V6.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 3H17M8 3H16V21H8V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M22 21V9H16V21H22Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 21H8V9H2V21Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

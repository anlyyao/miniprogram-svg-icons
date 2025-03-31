var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 9.99951H20V21H4V9.99951H3L6 4.99951H18L21 9.99951Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10 16V21H14V16H10Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M10 16V21H14V16H10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4 9.99951V20.9999H20V9.99951M4 9.99951H20M4 9.99951H3L6 4.99951H8M20 9.99951H21L18 4.99951H8M8 4.99951V2.99951" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

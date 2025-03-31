var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 2H22V22H2V2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 2H22V22H2V2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 8H8M8 8H10M8 8V6M8 8V10M14 8H18M14 14.5H18M14 17.5H18M6.58575 14.5859L7.99981 16M7.99981 16L9.41418 17.4144M7.99981 16L9.41388 14.5859M7.99981 16L6.58545 17.4144" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

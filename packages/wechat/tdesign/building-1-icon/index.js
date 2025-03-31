var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6.49991 4C8.99995 4.00003 9.16656 6.66667 8.99991 8L9.00049 11H21.0005V21H4.00044V8C3.83378 6.66667 3.99981 4 6.49991 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 16V21H17V16H13Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2.5 8H3.99991M3.99991 8H8.99991M3.99991 8V21H8.99991M3.99991 8C3.83324 6.66667 3.99981 4 6.49991 4M8.99991 8H10.5M8.99991 8V21M8.99991 8C9.16657 6.66667 9 4 6.49991 4M8.99991 21H21V11H9L8.99991 21ZM6.49991 4V2.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><rect x="13" y="16" width="4" height="5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

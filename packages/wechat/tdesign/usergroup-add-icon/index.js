var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M19 8C19 10.2091 17.2091 12 15 12C12.7909 12 11 10.2091 11 8C11 5.79086 12.7909 4 15 4C17.2091 4 19 5.79086 19 8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12C5.68629 12 3 14.6863 3 18V21M14 15H12C9.79086 15 8 16.7909 8 19V21H14M19 8C19 10.2091 17.2091 12 15 12C12.7909 12 11 10.2091 11 8C11 5.79086 12.7909 4 15 4C17.2091 4 19 5.79086 19 8Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20 15V18M20 18V21M20 18H17M20 18H23" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

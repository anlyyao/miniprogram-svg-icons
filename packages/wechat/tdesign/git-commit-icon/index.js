var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 12H2M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12M16 12H22" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 22V8H14V2H4V22H20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 2V8H20M20 7V22H4V2H15L20 7Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 17V12H12M12 12L12 17M12 12H14C14.5523 12 15 12.4477 15 13V17" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

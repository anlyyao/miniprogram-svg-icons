var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 7H3V21H21V7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3H3V7H21V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 3V21H21V3M3 3H21M3 3V7H21V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 11V14M12 14V17M12 14H9M12 14H15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

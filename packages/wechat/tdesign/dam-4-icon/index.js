var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H21C21 9 21 15.4651 21 21H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 21V11H9V21H15Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 21V11H12M15 21H21C21 15.4651 21 9 21 3H12M15 21H9M9 21V11H12M9 21H3V3H12M12 3V11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

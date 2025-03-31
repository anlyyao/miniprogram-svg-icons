var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3H21C21 9 21 15.4651 21 21H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 14H9V21H15V14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7 8V7M12 8V7M17 8V7M9 14H15V21H9V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 3H21C21 9 21 15.4651 21 21H3V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

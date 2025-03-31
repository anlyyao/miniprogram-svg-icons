var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.4997 7.49957L7 12.5L7 17.2092L20 17.2092L20 6.5L15.4997 10.9996L12.4997 7.49957Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 21H3V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12.4997 7.49957L7 12.5L7 17.2092L20 17.2092L20 6.5L15.4997 10.9996L12.4997 7.49957Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

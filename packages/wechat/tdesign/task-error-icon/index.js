var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 6V4H4V22H11M8 6H16M8 6V2H16V6M16 6V4H20V11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21.8287 16.1719L19.0003 19.0003M19.0003 19.0003L16.1719 21.8287M19.0003 19.0003L16.1719 16.1719M19.0003 19.0003L21.8287 21.8287" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

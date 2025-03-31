var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 4H9V1.5H15V4H20V22.5H4V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 4H9V1.5H15V4H20V22.5H4V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 10.5V13.5M12 13.5V16.5M12 13.5H9M12 13.5H15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

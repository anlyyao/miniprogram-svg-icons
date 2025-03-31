var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7.75 3.5H16.25V5.25C16.25 7.59721 14.3472 9.5 12 9.5C9.65279 9.5 7.75 7.59721 7.75 5.25V3.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 9.5C7.58172 9.5 4 13.0817 4 17.5V18C4 19.6569 5.34315 21 7 21H13M12 9.5C15.0136 9.5 17.638 11.1663 19.0021 13.6278M12 9.5C9.65279 9.5 7.75 7.59721 7.75 5.25V3.5H16.25V5.25C16.25 7.59721 14.3472 9.5 12 9.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 17H22M17 21H22" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

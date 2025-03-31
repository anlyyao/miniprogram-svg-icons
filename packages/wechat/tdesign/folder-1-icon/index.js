var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 20L22 20V9.75L2 9.75L2 20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 3.5H2V9.75H22V6H11L9 3.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2 9.75V20H22V9.75M2 9.75H22M2 9.75V3.5H9L11 6H22V9.75" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

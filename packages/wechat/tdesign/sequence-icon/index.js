var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M3 5H9V9H3V5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 5H21V9H15V5Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M6 19V9M18 19V9M3 5H9V9H3V5ZM15 5H21V9H15V5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12.6052 18.5L15 16L12.6052 13.5M13.75 16L9 16" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

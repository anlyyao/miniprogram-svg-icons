var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4L22 20L2 20L2 4L14 4L18 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 4V20L2 20L2 4L22 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M6 9V12M6 12H10M6 12V15M10 12V9M10 12V15M14 9V15H17C17.5523 15 18 14.5523 18 14V10C18 9.44772 17.5523 9 17 9H14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

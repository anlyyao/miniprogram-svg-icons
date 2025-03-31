var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4L22 20L2 20L2 4L14 4L18 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 4V20L2 20L2 4L22 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10 15H7C6.44772 15 6 14.5523 6 14V10C6 9.44772 6.44772 9 7 9H10M18 15H15C14.4477 15 14 14.5523 14 14V10C14 9.44772 14.4477 9 15 9H18" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

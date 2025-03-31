var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.5 4L22 12L12.5 20V14.9C7.5 14.9 4 16.5 1.5 20C2.5 15 5.5 10 12.5 9L12.5 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12.5 4L22 12L12.5 20V14.9C7.5 14.9 4 16.5 1.5 20C2.5 15 5.5 10 12.5 9L12.5 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

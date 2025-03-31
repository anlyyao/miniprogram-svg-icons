var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 5L16 7.3374C16 7.44308 15.9665 7.54603 15.9044 7.63149L12 13M8 5L8 7.33741C8 7.44308 8.03348 7.54603 8.09563 7.63149L12 13M12 13V19" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4.53936 4.69589L3.35474 12.3959C3.16835 13.6074 4.10571 14.7 5.33148 14.7H10.2003V18.154C10.2003 19.3161 10.9439 20.3479 12.0464 20.7154L12.9003 21L16.5003 12.9H20.0003V3H6.5161C5.52896 3 4.68946 3.72022 4.53936 4.69589Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4.53936 4.69589L3.35474 12.3959C3.16835 13.6074 4.10571 14.7 5.33148 14.7H10.2003V18.154C10.2003 19.3161 10.9439 20.3479 12.0464 20.7154L12.9003 21L16.5003 12.9H20.0003V3H6.5161C5.52896 3 4.68946 3.72022 4.53936 4.69589Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

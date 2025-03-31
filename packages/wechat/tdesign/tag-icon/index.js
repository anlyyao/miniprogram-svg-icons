var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M10.8788 21.6066L2.39355 13.1214L11.5149 4.01475L20.0002 4L20.0002 12.5L10.8788 21.6066Z" fill="{{fillColor1 || 'transparent'}}" /><g><path d="M10.8788 21.6066L2.39355 13.1214L11.5149 4.01475L20.0002 4L20.0002 12.5L10.8788 21.6066Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M15.9966 7.99976H16.0005L16.0005 8.00366L15.9966 8.00366V7.99976Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

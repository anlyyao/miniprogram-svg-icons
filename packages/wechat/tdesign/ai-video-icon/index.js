var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15.75 12.0001L9 15.8973L9 8.10303L15.75 12.0001Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 12V21H3V3H12M15.75 12L9 15.8971L9 8.10289L15.75 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19 2.75L19.7 4.29996L21.25 5L19.7 5.70004L19 7.25L18.3 5.70004L16.75 5L18.3 4.29996L19 2.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4.49951 10H19.4995V21H4.49951V10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9.99951 16H13.9995" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M4.49951 11H19.4995V21H4.49951V11Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6.99951 7C6.99951 4.23858 9.23809 2 11.9995 2C14.7609 2 16.9995 4.23858 16.9995 7V11H6.99951V7Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

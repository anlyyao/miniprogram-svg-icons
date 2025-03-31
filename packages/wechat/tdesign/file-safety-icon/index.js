var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.498 14.5C16.8935 14.5 19.1026 14.5 21.498 14.5V19.1336C21.498 19.8089 21.1572 20.4387 20.5919 20.808L17.998 22.5024L15.4042 20.808C14.8389 20.4387 14.498 19.8089 14.498 19.1336V14.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M20 10.5V7L15 2H4V22H10.5M14 2V8H20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14.498 14.5C16.8935 14.5 19.1026 14.5 21.498 14.5V19.1336C21.498 19.8089 21.1572 20.4387 20.5919 20.808L17.998 22.5024L15.4042 20.808C14.8389 20.4387 14.498 19.8089 14.498 19.1336V14.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

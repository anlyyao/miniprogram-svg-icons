var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 2C12.003 2.00395 18.0005 10 20 10H19.0001V21H5.0001V10H4C6 10 12 2 12 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 21L14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17L10 21L14 21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M14 21L14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17L10 21L14 21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M5 21L5 10L19.0001 10M5 21H19M5 21H3M19 10V21M19 21H21M2.99805 9C2.9999 9.5 3.25962 10 3.9999 10C5.9999 10 11.9999 2 11.9999 2C11.9999 2 17.9999 10 19.9999 10C20.7402 10 20.9999 9.5 20.9999 9" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 2C12 2 16.1773 7.7768 19 9.29434V21H5V9.29434C7.82225 7.77702 11.9988 2.00167 12 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 21L14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17L10 21L14 21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M14 21L14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17L10 21L14 21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M5 21H3M5 21H19M5 21L5 10L19 10L19 21M21 21H19M3 10C3.45499 10 4.16875 9.74123 5 9.29433C7.82266 7.7768 12 2 12 2C12 2 16.1773 7.7768 19 9.29433C19.8312 9.74123 20.545 10 21 10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

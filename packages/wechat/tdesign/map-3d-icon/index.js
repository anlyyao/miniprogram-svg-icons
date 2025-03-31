var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 3L18 6.5V13.5L12 17L6 13.5V6.5L12 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5.4 12.2437C3.31551 13.16 2 14.5032 2 16.0001C2 18.7615 6.47715 21.0001 12 21.0001C17.5228 21.0001 22 18.7615 22 16.0001C22 14.5032 20.6845 13.16 18.6 12.2437" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 10L17.6667 6.85M12 10V16.65M12 10L6.33333 6.85M12 3L18 6.5V13.5L12 17L6 13.5V6.5L12 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

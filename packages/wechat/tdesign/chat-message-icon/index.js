var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 3L21.5 3L21.5 17L6.5 17L2.5 20.5L2.5 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2.5 3L21.5 3L21.5 17L6.5 17L2.5 20.5L2.5 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M7.00391 10L7 10L7 9.99609L7.00391 9.99609L7.00391 10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12.0039 10L12 10V9.99609L12.0039 9.99609V10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17.0039 10L17 10V9.99609L17.0039 9.99609V10Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

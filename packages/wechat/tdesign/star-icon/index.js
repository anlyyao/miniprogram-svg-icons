var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.0001 3.67603L14.1867 9.96648L20.8449 10.1022L15.538 14.1256L17.4665 20.4999L12.0001 16.696L6.5337 20.4999L8.46217 14.1256L3.15527 10.1022L9.81354 9.96648L12.0001 3.67603Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12.0001 3.67603L14.1867 9.96648L20.8449 10.1022L15.538 14.1256L17.4665 20.4999L12.0001 16.696L6.5337 20.4999L8.46217 14.1256L3.15527 10.1022L9.81354 9.96648L12.0001 3.67603Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

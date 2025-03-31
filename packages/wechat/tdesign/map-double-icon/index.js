var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7.5 10.125V20.25L12 18.375L16.5 21L21 18.375V8.25L16.5 10.125L12 7.5L7.5 10.125Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 7.5L7.5 10.125V13.875L3 15.75V5.625L7.5 3L12 5.625L16.5 3.75L16.5 10.125L12 7.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 7.5L7.5 10.125V13.875L3 15.75V5.625L7.5 3L12 5.625L16.5 3.75L16.5 10.125L12 7.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M12 17.625V8.25M16.5 10.9V20.25M7.5 20.25V10.125L12 7.5L16.5 10.125L21 8.25V18.375L16.5 21L12 18.375L7.5 20.25Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

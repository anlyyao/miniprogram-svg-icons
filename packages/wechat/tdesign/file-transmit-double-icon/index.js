var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M1 20H12V10H6V4H1V20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 20H23V10H17V4H12V20Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M12 20V9L7 4H1V20H12ZM12 20H23V9L18 4H12V20ZM17 4V10H23M6 4V10H12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M17.79 16.29L16.4972 15.0001L17.79 13.71M6.20996 16.29L7.50282 15.0001L6.20997 13.71" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

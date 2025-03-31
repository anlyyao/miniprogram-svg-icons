var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.002 2C12.0222 2.03345 15.0624 7.05731 17 7.77734V12H20V21H4V12H7.00195V7.77734C8.94687 7.05412 12.002 2 12.002 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 16L9 16L9 21L15 21L15 16Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M15 16L9 16L9 21L15 21L15 16Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20 12L20 21H4.00001L4 12M20 12L21 12M20 12L4 12M4 12L3 12M6.00001 8C6.26718 8 6.61248 7.92193 7.00235 7.77695C8.94727 7.05373 12.0016 2 12.0016 2C12.0016 2 15.0559 7.05546 17 7.77773C17.3889 7.92221 17.7333 8 18 8M7.00234 8H17M17.0012 8.3V12M7.00118 8.3L7.00118 12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

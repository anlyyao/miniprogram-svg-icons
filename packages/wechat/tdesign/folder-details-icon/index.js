var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 3.5L9 3.5L11 6L22 6L22 20L2 20L2 3.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 3.5H9L11 6H22V20H2V3.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M11.998 12.998H12.002V13.002H11.998V12.998Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M7.99805 12.998H8.00195V13.002H7.99805V12.998Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M15.998 12.998H16.002V13.002H15.998V12.998Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

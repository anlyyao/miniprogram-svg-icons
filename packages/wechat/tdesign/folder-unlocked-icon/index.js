var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15.999 16.5H22.999V21H15.999V16.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 20H2V3.5H9L11 6H22V9" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17.25 16.5V14.75C17.25 13.5074 18.2574 12.5 19.5 12.5C20.1188 12.5 20.6793 12.7498 21.0861 13.1541M15.999 16.5H22.999V21H15.999V16.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

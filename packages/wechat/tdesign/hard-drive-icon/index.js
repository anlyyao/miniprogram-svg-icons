var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21H21V15H3V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 15H21M3 3H21V21H3V3ZM6.99805 17.998H7.00195V18.002H6.99805V17.998ZM9.99805 17.998H10.002V18.002H9.99805V17.998Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 11H20V21H4V11Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 21H20V16H18L15 17L12 16L9 17L6 16H4V21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M8 6V11M12 6V11M16 6V11M7.99805 2.99805H8.00195V3.00195H7.99805V2.99805ZM11.998 2.99805H12.002V3.00195H11.998V2.99805ZM15.998 2.99805H16.002V3.00195H15.998V2.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M2 21H22M4 16H6L9 17L12 16L15 17L18 16H20M4 11H20V21H4V11Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 21H3V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 4.00567C7 7.99233 7.99609 13.9999 13 14.0038C18.0039 14.0077 19 7.98833 19 4M6.99805 16.998H7.00195V17.002H6.99805V16.998ZM9.99805 16.998H10.002V17.002H9.99805V16.998ZM12.998 16.998H13.002V17.002H12.998V16.998ZM15.998 16.998H16.002V17.002H15.998V16.998ZM18.998 16.998H19.002V17.002H18.998V16.998Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

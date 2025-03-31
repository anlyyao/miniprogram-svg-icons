var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 7H21V19H3V7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 7V4C12 3.44772 12.4477 3 13 3H16M3 7V19H21V7H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 13H8M8 13H10M8 13V11M8 13V15M14 13H14.0035V13.004H14V13ZM16 11H16.0035V11.004H16V11ZM16 15H16.0035V15.004H16V15ZM18 13H18.0035V13.004H18V13Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

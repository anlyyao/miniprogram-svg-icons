var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 3V9H21V21H3V9H12V3H20Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 21V15H15V21H9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 3V9H20V3M12 3H20M12 3H11M20 3H21M3 9V21H21V9H3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M9 21V15H15V21H9Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 5.99805H15.0039V6.00195H15V5.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

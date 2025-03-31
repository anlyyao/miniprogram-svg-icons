var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 3.5H9L11 6H22V20H2V3.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 3.5H9L11 6H22V20H2V3.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 13.5C13.1046 13.5 14 12.6046 14 11.5C14 10.3954 13.1046 9.5 12 9.5C10.8954 9.5 10 10.3954 10 11.5C10 12.6046 10.8954 13.5 12 13.5ZM12 13.5C10.3431 13.5 9 14.8431 9 16.5M12 13.5C13.6569 13.5 15 14.8431 15 16.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

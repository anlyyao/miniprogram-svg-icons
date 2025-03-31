var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.5 2.5H6.5C4.84315 2.5 3.5 3.84315 3.5 5.5V18.5C3.5 16.8431 4.84315 15.5 6.5 15.5H20.5V2.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20.5 21.5H6.5C4.84315 21.5 3.5 20.1569 3.5 18.5C3.5 16.8431 4.84315 15.5 6.5 15.5H20.5V21.5ZM20.5 21.5V2.5H6.5C4.84315 2.5 3.5 3.84315 3.5 5.5V17.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M11.5 6.5H16.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7.5 11.1L11.1 3L11.9538 3.28461C13.0563 3.65211 13.8 4.68389 13.8 5.84605V9.3H18.6688C19.8945 9.3 20.8319 10.3926 20.6455 11.6041L19.4609 19.3041C19.3108 20.2798 18.4713 21 17.4842 21H7.5V11.1Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7.5 11.0996V20.9996H3V11.0996H7.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7.5 11.1V21M7.5 11.1L11.1 3L11.9538 3.28461C13.0563 3.65211 13.8 4.68389 13.8 5.84605V9.3H18.6688C19.8945 9.3 20.8319 10.3926 20.6455 11.6041L19.4609 19.3041C19.3108 20.2798 18.4713 21 17.4842 21H7.5M7.5 11.1H3V21H7.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

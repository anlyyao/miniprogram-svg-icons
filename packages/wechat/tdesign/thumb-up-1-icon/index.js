var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M19.4609 19.3041L20.6455 11.6041C20.8319 10.3926 19.8945 9.3 18.6688 9.3H13.8V5.84605C13.8 4.68389 13.0563 3.65211 11.9538 3.28461L11.1 3L7.5 11.1H4V21H17.4842C18.4713 21 19.3108 20.2798 19.4609 19.3041Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M19.4609 19.3041L20.6455 11.6041C20.8319 10.3926 19.8945 9.3 18.6688 9.3H13.8V5.84605C13.8 4.68389 13.0563 3.65211 11.9538 3.28461L11.1 3L7.5 11.1H4V21H17.4842C18.4713 21 19.3108 20.2798 19.4609 19.3041Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

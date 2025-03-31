var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_3544)"><path d="M15.8573 1.62988L22.2543 8.02694L7.86093 22.4203L1.46387 16.0233L15.8573 1.62988Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5.06208 12.4248L6.66429 14.027M12.2589 5.22852L13.8611 6.83072M8.66047 8.82617L11.0623 11.228M15.8573 1.62988L22.2543 8.02694L7.86093 22.4203L1.46387 16.0233L15.8573 1.62988Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

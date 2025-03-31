var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 21.1066V3L6.6967 8.3033C3.76777 11.2322 3.76777 15.981 6.6967 18.9099C8.16117 20.3744 10.0806 21.1066 12 21.1066Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21.1066V3L17.3033 8.3033C20.2322 11.2322 20.2322 15.981 17.3033 18.9099C15.8388 20.3744 13.9194 21.1066 12 21.1066Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 20V4" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 21C14.0474 21 15.5 20.5905 17.3033 18.9099M17.3033 18.9099C20.2888 16.1275 20 11 17.3033 8.3033M17.3033 18.9099C20.2322 15.981 20.2322 11.2322 17.3033 8.3033M17.3033 18.9099C14.3744 21.8388 9.62563 21.8388 6.6967 18.9099C3.76777 15.981 3.76777 11.2322 6.6967 8.3033L12 3L17.3033 8.3033" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

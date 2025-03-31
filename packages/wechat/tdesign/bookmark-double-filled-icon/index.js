var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.0034 18.4186L23 0.000732422L10.001 0.0019865V2.00199L21 2.00129V16.4152L23.0034 18.4186Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M19 4H3V23.9432L11 18.2289L19 23.9432V4Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

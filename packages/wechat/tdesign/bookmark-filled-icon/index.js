var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 3H20V22.9432L12 17.2289L4 22.9432V3Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});

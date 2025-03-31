var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 3L21 3L21 21L3 21L3 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 3L21 3L21 21L3 21L3 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 12V17M7 7L7 17C8.66667 17 12 17 12 17M19 12.5C17.7194 12.5 16.4913 13.0087 15.5858 13.9142L15.4393 14.0607" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

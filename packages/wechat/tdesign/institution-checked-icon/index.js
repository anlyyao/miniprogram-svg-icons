var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 7L11 2L20 7V8H2V7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11 12V18M5 12V18M11 22H2M17 12V16M2 7V8H20V7L11 2L2 7Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21.1823 17.9395L16.9397 22.1821L14.8184 20.0608" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11.9999 21.4853L20.4852 13H3.51465L11.9999 21.4853Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11.9999 4.51491L20.4852 13.0002L11.9999 21.4855L3.51465 13.0002L11.9999 4.51491ZM11.9999 4.51491L9.52506 2.04004M19.9499 13H4.24991" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20.2197 21.0095C20.5126 21.3795 20.9874 21.3795 21.2803 21.0095C21.5732 20.6396 21.5732 20.0398 21.2803 19.6698L20.75 19L20.2197 19.6698C19.9268 20.0398 19.9268 20.6396 20.2197 21.0095Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

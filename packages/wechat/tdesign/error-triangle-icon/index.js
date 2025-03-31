var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.0003 3L22.2194 20.7H1.78125L12.0003 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12.0003 3L22.2194 20.7H1.78125L12.0003 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 10.5V14M12 17.5H12.0039V17.5039H12V17.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

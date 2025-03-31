var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M12 15V21.5L5.5 15V8.5H12L18.5 15H12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M18.5 2H5.5L12 8.5H18.5V2Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M12 8.5L18.5 15H12V21.5L5.5 15V8.5H12ZM12 8.5L5.5 2H18.5V8.5H12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

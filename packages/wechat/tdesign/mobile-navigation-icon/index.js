var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 2H19V22H5V2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 7L15 13L12 12.0625L9 13L12 7Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5 2H19V22H5V2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M12 7L15 13L12 12.0625L9 13L12 7Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M12 18H12.0039V18.0039H12V18Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

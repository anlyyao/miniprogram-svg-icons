var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.0001 2L20.6604 7V17L12.0001 22L3.33984 17V7L12.0001 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12.0001 2L20.6604 7V17L12.0001 22L3.33984 17V7L12.0001 2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 10L12 12M12 12L15 10M12 12V15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

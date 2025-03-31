var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 12L20.5 7.5M12 12V21.5M12 12L3.5 7.5M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

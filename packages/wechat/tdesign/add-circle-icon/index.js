var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><ellipse cx="12" cy="12" rx="10" ry="10" transform="rotate(180 12 12)" fill="{{fillColor1 || 'transparent'}}" /><ellipse cx="12" cy="12" rx="10" ry="10" transform="rotate(180 12 12)" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M16.5 12L12 12M12 12L7.5 12M12 12L12 7.5M12 12V16.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

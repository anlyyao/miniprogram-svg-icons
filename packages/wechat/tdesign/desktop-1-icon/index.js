var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 4H22V15H2V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 15V18H22V15H2Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 18V21M2 15H22M9 21H15M2 4H22V18H2V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

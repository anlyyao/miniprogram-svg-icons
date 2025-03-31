var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15 12L10.5 15V9L15 12Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 22.0001C6.47715 22.0001 2 17.5229 2 12C2 6.47717 6.47715 2 12 2C17.5228 2 22 6.47717 22 12M15 12L10.5 15V9L15 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19 16V19M19 19V22M19 19H16M19 19H22" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

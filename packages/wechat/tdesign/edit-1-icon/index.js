var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3.0001 20.9999L7.5 20.9999L17.5 11L13 6.5L3.0001 16.5L3.0001 20.9999Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21.5 7L17 2.5L13 6.5L17.5 11L21.5 7Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12.9999 6.5L3 16.5L3 20.9999L7.4999 20.9999L17.4999 11M12.9999 6.5L17.4999 11M12.9999 6.5L16.9999 2.5L21.4999 7L17.4999 11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

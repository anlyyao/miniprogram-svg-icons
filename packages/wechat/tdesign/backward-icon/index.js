var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M5 12L10.25 17.25V6.75L5 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 12L17.25 17.25V6.75L12 12Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M5 12L10.25 17.25V6.75L5 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 12L17.25 17.25V6.75L12 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

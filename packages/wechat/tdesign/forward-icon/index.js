var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M12 12L6.75 17.25V6.75L12 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M19 12L13.75 17.25V6.75L19 12Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M12 12L6.75 17.25V6.75L12 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19 12L13.75 17.25V6.75L19 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M19 21H5V19C5 15.134 8.13401 12 12 12C15.866 12 19 15.134 19 19V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5 3H19V5C19 8.86599 15.866 12 12 12C8.13401 12 5 8.86599 5 5V3Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M12 12C15.866 12 19 15.134 19 19V21H5V19C5 15.134 8.13401 12 12 12ZM12 12C8.13401 12 5 8.86599 5 5V3H19V5C19 8.86599 15.866 12 12 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

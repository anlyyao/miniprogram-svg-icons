var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 10H19V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M19 10V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V10M19 10H12M19 10V9C19 5.13401 15.866 2 12 2M5 10H12M5 10V9C5 5.13401 8.13401 2 12 2M12 10V2" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15.1823 8.81836L12.0003 12.0003M12.0003 12.0003L8.81836 15.1823M12.0003 12.0003L15.1823 15.1823M12.0003 12.0003L8.81836 8.81836" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

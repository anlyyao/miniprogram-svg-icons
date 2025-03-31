var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 16.0004V21.0004M3 16.0004H2M3 16.0004H12M3 16.0004V3M21 16.0004V21.0004M21 16.0004H22M21 16.0004H12M21 16.0004V3M12 16.0004V3M3.5 6.33333L12 12L20.5 6.33333" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

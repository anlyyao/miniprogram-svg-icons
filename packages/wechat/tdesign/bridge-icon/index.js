var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 16.0004H3M3 16.0004H21M3 16.0004V3M3 16.0004V21.0004M21 16.0004H22M21 16.0004V3M21 16.0004V21.0004M7 16L7 8M12 16.0004V8M12 8C7.41421 8 4.58088 6.8317 3.5 6.28096M12 8C16.5864 8 19.4198 6.8314 20.5004 6.28074M17 16V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

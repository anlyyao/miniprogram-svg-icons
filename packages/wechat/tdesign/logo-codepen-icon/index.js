var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 15.15L12 8.50002M12 8.50002L21.5 15.15M12 8.50002V2.75002M21.5 8.85002L12 15.5M12 15.5L2.5 8.85002M12 15.5V21.5M2 15.5V8.5L12 2L22 8.5V15.5L12 22L2 15.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

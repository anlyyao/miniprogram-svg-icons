var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21.9958 7.50495L11.9998 20L2.00391 7.50509C7.83088 2.83177 16.1687 2.83156 21.9958 7.50495Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1.5 10.5L12 21L19.5 13.5L15 9L12 12L9 9L12 6L9 3L1.5 10.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 3L12 6L9 9L12 12L15 9L19.5 13.5L22.5 10.5L15 3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 6L9 3L1.5 10.5L12 21L19.5 13.5M12 6L9 9L12 12L15 9L19.5 13.5M12 6L15 3L22.5 10.5L19.5 13.5M14.3684 18.632L12 16.2637M16.7365 16.2629L14.3682 13.8945" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

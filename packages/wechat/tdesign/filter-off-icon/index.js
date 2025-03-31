var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15.1552 10.1552L19.5 4H9.5M9.5 4H9L9.01 4.00977L9.5 4ZM5.7002 5.7002L10.5002 12.5002V20.0002H13.5002V13.5002L5.7002 5.7002Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20 20L3 3" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

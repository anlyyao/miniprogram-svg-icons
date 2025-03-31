var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18 18.5V5.5M5.58561 13.2276L4.0039 18.5H4L5.58561 13.2276ZM5.58561 13.2276L7.90386 5.5H9.20386L11.5651 13.371M11.5651 13.371L13.1038 18.5H13.0999L11.5651 13.371ZM5.95381 13.371H11.1538" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

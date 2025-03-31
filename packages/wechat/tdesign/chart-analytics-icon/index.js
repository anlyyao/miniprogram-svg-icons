var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 21H3V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 13.9991L11 8.99907L15 12.9991C15.4204 12.5787 16.5485 11.4531 17.7149 10.2897M19.3067 8.70206L21.0037 7.00977C21.0037 7.00977 20.2691 7.7422 19.3067 8.70206ZM19.3067 8.70206L19.303 8.70571M19.303 8.70571C18.8105 9.1969 18.2585 9.74742 17.7149 10.2897M19.303 8.70571L17.7149 10.2897M17 7H21V11" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

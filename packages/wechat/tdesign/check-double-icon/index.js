var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.10059 11.4141L7.05033 16.3638L7.40389 16.0103M16.2426 7.17139L12.3535 11.0605M21.8999 7.17139L12.7076 16.3638L7.75781 11.414" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M9 19V5M16 19V17.2573C16 17.0958 15.922 16.9443 15.7906 16.8504L9.5 12.3571M16 5V6.74269C16 6.90417 15.922 7.0557 15.7906 7.14956L9.5 11.6429" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_7968)"><path d="M12 1.5L15.2145 4.23941L19.4246 4.57538L19.7606 8.78546L22.5 12L19.7606 15.2145L19.4246 19.4246L15.2145 19.7606L12 22.5L8.78546 19.7606L4.57538 19.4246L4.23941 15.2145L1.5 12L4.23941 8.78546L4.57538 4.57538L8.78546 4.23941L12 1.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 1.5L15.2145 4.23941L19.4246 4.57538L19.7606 8.78546L22.5 12L19.7606 15.2145L19.4246 19.4246L15.2145 19.7606L12 22.5L8.78546 19.7606L4.57538 19.4246L4.23941 15.2145L1.5 12L4.23941 8.78546L4.57538 4.57538L8.78546 4.23941L12 1.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 12L11 15L16.5 9.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

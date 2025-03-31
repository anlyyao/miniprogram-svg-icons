var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M9.70802 2.5C10.0938 1.61705 10.9748 1 12 1C13.0252 1 13.9062 1.61705 14.292 2.5H20.5V21.5H3.5V2.5H9.70802Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M9.70802 2.5C10.0938 1.61705 10.9748 1 12 1C13.0252 1 13.9062 1.61705 14.292 2.5H20.5V21.5H3.5V2.5H9.70802Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7.75781 12.4142L10.5862 15.2427L16.2431 9.58582" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

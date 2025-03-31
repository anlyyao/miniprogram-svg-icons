var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 5V8.83682C20.8175 9.39855 20 10.6038 20 12C20 13.3962 20.8175 14.6015 22 15.1632V19L2 19V15.1632C3.18247 14.6015 4 13.3962 4 12C4 10.6038 3.18247 9.39855 2 8.83682V5H22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 5V8.83682C20.8175 9.39855 20 10.6038 20 12C20 13.3962 20.8175 14.6015 22 15.1632V19L2 19V15.1632C3.18247 14.6015 4 13.3962 4 12C4 10.6038 3.18247 9.39855 2 8.83682V5H22Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M9 10H15M9 14H15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

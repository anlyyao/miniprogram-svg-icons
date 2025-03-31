var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1 5H23V19H1V5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M1 5H23V19H1V5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14 12.4975L16.5025 15L19.0031 12.4993M16.5025 9V14.2521M11 15V10C11 9.44772 10.5523 9 10 9L8 9M8 9L8 15M8 9L5 9L5 15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_1945)"><path d="M4 4H20V20H4V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 9H15V15H9V9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 8H1.5M8 4V1.5M16 4V1.5M20 16H22.5M20 8H22.5M8 20V22.5M16 20V22.5M4 16H1.5M4 4H20V20H4V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 9H15V15H9V9Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

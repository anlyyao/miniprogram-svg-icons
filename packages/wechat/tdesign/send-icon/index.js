var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_8119)"><path d="M2 3.5L21.5 12L2 20.5L5 12L2 3.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5 12L2 20.5L21.5 12L2 3.5L5 12ZM5 12H10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

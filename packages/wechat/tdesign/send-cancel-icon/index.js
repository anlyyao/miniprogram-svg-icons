var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_8122)"><path d="M5 12L2 20.5L11.75 16.25M5 12L2 3.5L21.5 12L19.0625 13.0625M5 12H10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21.6675 16L18.8379 18.8485M18.8379 18.8485L16.02 21.6663M18.8379 18.8485L21.6569 21.6675M18.8379 18.8485L16 16.0106" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

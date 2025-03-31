var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_1240)"><path d="M9.65446 3.001H8.65446L8.65346 3L9.65446 3.001ZM9.65446 3.001L21.5 3.00001L21.5 14.582M21.5 14.582V15.582L21.501 15.583L21.5 14.582ZM17 17.001H6.5L2.5 20.501L2.5 3.00098H3L17 17.001Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 22.001L2 2.00098" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18.2969 19.5156L12 4.5L5.70312 19.5156H18.2969Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14.5 10.5H9.5L7.5 15.2308H16.5L14.5 10.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 20H20M8 15.2305H16M10 10.5H14M18.2969 19.5156L12 4.5L5.70313 19.5156" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

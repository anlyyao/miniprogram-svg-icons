var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 17.2096L7 17.2096V16.5V16L12.3257 11.1739L15.3257 14.6739L20 10L20 17.2096Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 21H3V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20 10L20 17.2096L7 17.2096L7 16L12.3257 11.1739L15.3257 14.6739L20 10ZM20 10L19.9997 10.5M7 12.5L12.4997 7.49957L15.4997 10.9996L20 6.5V9.99957L15.3257 14.6735L12.3257 11.1735L7 15.9996L7 12.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M10.2802 2.5L12.212 3.01764L14.7779 11.9874L20.2837 13.4626C21.0839 13.6771 21.5587 14.4996 21.3443 15.2998C21.1299 16.1 20.3074 16.5748 19.5072 16.3604L2.60352 11.8311L2.93169 6.74264L4.38057 7.13087L5.02205 9.3733L10.1415 10.745L10.2802 2.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10.2802 2.5L12.212 3.01764L14.7779 11.9874L20.2837 13.4626C21.0839 13.6771 21.5587 14.4996 21.3443 15.2998C21.1299 16.1 20.3074 16.5748 19.5072 16.3604L2.60352 11.8311L2.93169 6.74264L4.38057 7.13087L5.02205 9.3733L10.1415 10.745L10.2802 2.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 20H21" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 3H8V15C8 12.7909 9.79086 11 12 11C14.2091 11 16 12.7909 16 15V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 3V21M4 3H8M4 3H3M20 3V21M20 3H16M20 3H21M4 21H3M4 21C9 21 3 21 8 21M20 21H21M20 21H16M8 3H16M8 3C8 8.9797 8 9.84222 8 15M8 21H16M8 21C8 19.5597 8 16.2423 8 15M16 3V15M16 21V15M8 15C8 12.7909 9.79086 11 12 11C14.2091 11 16 12.7909 16 15" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M20 21V3H16V21H20Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 21V3H8V21H4Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

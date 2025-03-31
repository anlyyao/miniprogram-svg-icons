var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21.75 16.75C21.75 20.0035 18 22.5 18 22.5C18 22.5 14.25 20.0035 14.25 16.75C14.25 14.6789 15.9289 13 18 13C20.0711 13 21.75 14.6789 21.75 16.75Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M17.75 17H18.25M21.75 16.75C21.75 20.0035 18 22.5 18 22.5C18 22.5 14.25 20.0035 14.25 16.75C14.25 14.6789 15.9289 13 18 13C20.0711 13 21.75 14.6789 21.75 16.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20.5 9.5V2.5L3.5 2.5V21.5H12M8 8H16M8 12H11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

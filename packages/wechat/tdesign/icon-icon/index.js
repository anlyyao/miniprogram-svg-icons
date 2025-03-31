var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 14.5C3 18.0899 5.91015 21 9.5 21C13.0899 21 16 18.0899 16 14.5C16 10.9101 13.0899 8 9.5 8C5.91015 8 3 10.9101 3 14.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 3H21V15H16C16 10.8955 13.1045 8 9 8V3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9 8V3H21V15H16" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M3 14.5C3 18.0899 5.91015 21 9.5 21C13.0899 21 16 18.0899 16 14.5C16 10.9101 13.0899 8 9.5 8C5.91015 8 3 10.9101 3 14.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

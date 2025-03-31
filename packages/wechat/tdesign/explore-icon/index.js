var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4.92893 19.0711C1.02369 15.1659 1.02369 8.83424 4.92893 4.92899C8.83417 1.02375 15.1658 1.02375 19.0711 4.92899C22.9763 8.83424 22.9763 15.1659 19.0711 19.0711C15.1658 22.9764 8.83418 22.9764 4.92893 19.0711Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7.40039 11.4928L15.7017 8.29999L12.5089 16.6012L11.1581 12.8436L7.40039 11.4928Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4.92893 19.0711C1.02369 15.1659 1.02369 8.83424 4.92893 4.92899C8.83417 1.02375 15.1658 1.02375 19.0711 4.92899C22.9763 8.83424 22.9763 15.1659 19.0711 19.0711C15.1658 22.9764 8.83418 22.9764 4.92893 19.0711Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7.40039 11.4928L15.7017 8.29999L12.5089 16.6012L11.1581 12.8436L7.40039 11.4928Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 19.9996H20V2.99963L17 4.99963L14.5 2.99963L12 4.99963L9.5 2.99963L7 4.99963L4 2.99963V19.9996Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 19.9996H20V2.99963L17 4.99963L14.5 2.99963L12 4.99963L9.5 2.99963L7 4.99963L4 2.99963V19.9996Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-miterlimit="2.41327" /><path d="M8 14.9996H16M12 10.9996H16M8 10.9996H8.00391V11.0035H8V10.9996Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

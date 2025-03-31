var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18.75 22.5C18.75 22.5 22.5 20.0035 22.5 16.75C22.5 14.6789 20.8211 13 18.75 13C16.6789 13 15 14.6789 15 16.75C15 20.0035 18.75 22.5 18.75 22.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M8 6V4H4V22H13M8 6H16M8 6V2H16V6M16 6V4H20V9.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18.5 17H19M22.5 16.75C22.5 20.0035 18.75 22.5 18.75 22.5C18.75 22.5 15 20.0035 15 16.75C15 14.6789 16.6789 13 18.75 13C20.8211 13 22.5 14.6789 22.5 16.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

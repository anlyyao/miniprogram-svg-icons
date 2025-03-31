var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.998 17.5H20.998V22H13.998V17.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M10 22H5V2H19V10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15.2495 17.5V15.75C15.2495 14.5074 16.2569 13.5 17.4995 13.5C18.7422 13.5 19.7495 14.5074 19.7495 15.75V17.5M13.998 17.5H20.998V22H13.998V17.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

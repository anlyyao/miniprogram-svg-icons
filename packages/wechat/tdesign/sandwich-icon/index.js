var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.2788 3.3934C14.6979 3.16478 15.2202 3.26433 15.5259 3.6311L20 8.99999V21H4V8.99999L14.2788 3.3934Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 9V15H4V9H20Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 15H20M4.75 9.00003H19.25M20 9.36208V21H4V9.00003L14.2788 3.3934C14.698 3.16478 15.2203 3.26433 15.5259 3.63111L19.7682 8.7219C19.918 8.90161 20 9.12815 20 9.36208Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

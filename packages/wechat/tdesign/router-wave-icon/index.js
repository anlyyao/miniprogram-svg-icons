var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 15H19V22H5V15Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 15V12M5 15V22H19V15H5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M2.73633 7.07193C4.69159 4.02153 8.11167 2 12.0039 2C15.8961 2 19.3162 4.02153 21.2715 7.07193M6.9375 8.75479C8.00401 7.09093 9.8695 5.98828 11.9925 5.98828C14.1156 5.98828 15.9811 7.09093 17.0476 8.75479" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

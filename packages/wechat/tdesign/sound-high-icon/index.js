var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.0002 21L5.99902 16.5V7.5L14.0002 3V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 16.5L2 7.5H5.99882L5.99882 16.5L2 16.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5.99882 16.5L2 16.5L2 7.5H5.99882M5.99882 16.5L14 21V3L5.99882 7.5M5.99882 16.5L5.99882 7.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16.9141 10.5858C17.6951 11.3669 17.6951 12.6332 16.9141 13.4143M18.6818 8.81806C20.4392 10.5754 20.4392 13.4247 18.6818 15.182M20.4496 7.05029C23.1833 9.78396 23.1833 14.2161 20.4496 16.9498" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

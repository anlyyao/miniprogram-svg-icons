var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 10.333V19.9997L2 19.9997L2 10.333L22 10.333Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3.35389 10.3333L20.8245 10.3333L19.0009 5L3.35389 10.3333ZM3.35389 10.3333L17.1433 5.63318L14.1465 1.43164L2.99942 10.3359M3.35389 10.3333L2.99942 10.3359M2.99942 10.3359H2.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M20.8241 10.3333L19.0005 5L3.35349 10.3333L20.8241 10.3333Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M14.1461 1.43164L2.99902 10.3359L3.35349 10.3333L17.1429 5.63318L14.1461 1.43164Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M6.28516 15.1641H6.28906V15.168H6.28516V15.1641Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 10.333V19.9997L2 19.9997L2 10.333L22 10.333Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

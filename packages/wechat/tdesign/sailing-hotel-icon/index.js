var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 22H8V2C11.6851 2.64088 14.0353 4.56529 15.4619 7C16.3579 8.52922 16.8896 10.2598 17.1589 12C17.4248 13.7187 17.4348 15.4469 17.2869 17C17.079 19.184 16.559 21.0217 16 22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16.65 12H8M14.95 7H8M16.8 17H8M20 22H5M8 22V2C13.9996 3.04341 16.4609 7.48906 17.1589 12C17.7422 15.7701 17.0939 19.5857 16.25 21.499" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

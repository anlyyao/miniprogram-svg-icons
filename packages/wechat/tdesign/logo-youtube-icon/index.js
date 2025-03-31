var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1 11.5C1 7.72876 1 5.84315 2.17157 4.67157C3.34315 3.5 5.22876 3.5 9 3.5H15C18.7712 3.5 20.6569 3.5 21.8284 4.67157C23 5.84315 23 7.72876 23 11.5V12.5C23 16.2712 23 18.1569 21.8284 19.3284C20.6569 20.5 18.7712 20.5 15 20.5H9C5.22876 20.5 3.34315 20.5 2.17157 19.3284C1 18.1569 1 16.2712 1 12.5V11.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9.80078 15.3024L15.501 12.0008L9.80078 8.69922V15.3024Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M1 11.5C1 7.72876 1 5.84315 2.17157 4.67157C3.34315 3.5 5.22876 3.5 9 3.5H15C18.7712 3.5 20.6569 3.5 21.8284 4.67157C23 5.84315 23 7.72876 23 11.5V12.5C23 16.2712 23 18.1569 21.8284 19.3284C20.6569 20.5 18.7712 20.5 15 20.5H9C5.22876 20.5 3.34315 20.5 2.17157 19.3284C1 18.1569 1 16.2712 1 12.5V11.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M9.80078 15.3024L15.501 12.0008L9.80078 8.69922V15.3024Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

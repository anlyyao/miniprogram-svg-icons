var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1 5L1 19L16 19L16 5L1 5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11.5 12L7 15L7 9L11.5 12Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M23 5.99805L16 10.198V13.998L23 17.998V5.99805Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M11.5 12L7 15L7 9.00003L11.5 12Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M23 5.99805L16 10.198L16 13.998L23 17.998V5.99805Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M1 4.99805L1 18.998L16 18.998L16 4.99805L1 4.99805Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});

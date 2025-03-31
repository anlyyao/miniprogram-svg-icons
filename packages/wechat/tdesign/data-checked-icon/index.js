var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_1912)"><path d="M3 3H21V12H3V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 12V3H3V12M21 12H3M21 12V13.5M3 12L3 21.0004H12M3 12V11.998M6.99805 7.5H7.00195V7.50391H6.99805V7.5ZM6.99805 16.5H7.00195V16.5039H6.99805V16.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22.6818 17.4395L18.4392 21.6821L16.3179 19.5608" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 19.9996H21V13.0025L19 10.0039H5L3 13.0025V19.9996Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7.2002 4V10.0043H16.8002V4H7.2002Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7.2002 4V10.0043H16.8002V4H7.2002Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 19.9996H21V13.0025L19 10.0039H5L3 13.0025V19.9996Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

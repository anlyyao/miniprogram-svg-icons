var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.125 2H21V22H13.125V2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 22.0004V4.22266L13.125 14.2227V22.0004H3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 22.0004V4.22266L13.125 14.2227V18.1115V22.0004H3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17.8501 5.33301H21.0001M17.8501 8.66602H21.0001M17.8501 12H21.0001M17.8501 15.333H21.0001M17.8501 18.666H21.0001M13.125 2H21V22H13.125V2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 4H4.5L10.5 12.5V20H13.5V12.5L19.5 4Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 4H4.5L10.5 12.5V20H13.5V12.5L19.5 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22.1215 14.8789L20.0002 17.0002M20.0002 17.0002L17.8789 19.1215M20.0002 17.0002L17.8789 14.8789M20.0002 17.0002L22.1215 19.1215" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.5 3H21.5V17H6.5L2.5 20.5L2.5 3Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M8.64143 10.091C7.76275 9.21231 7.76275 7.78769 8.64143 6.90901C9.52011 6.03033 10.9447 6.03033 11.8234 6.90901L12.0002 7.08579L12.177 6.90901C13.0556 6.03033 14.4803 6.03033 15.3589 6.90901C16.2376 7.78769 16.2376 9.21231 15.3589 10.091L12.0002 13.4497L8.64143 10.091Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M2.5 3H21.5V17H6.5L2.5 20.5L2.5 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path fill-rule="evenodd" clip-rule="evenodd" d="M8.64143 10.091C7.76275 9.21231 7.76275 7.78769 8.64143 6.90901C9.52011 6.03033 10.9447 6.03033 11.8234 6.90901L12.0002 7.08579L12.177 6.90901C13.0556 6.03033 14.4803 6.03033 15.3589 6.90901C16.2376 7.78769 16.2376 9.21231 15.3589 10.091L12.0002 13.4497L8.64143 10.091Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

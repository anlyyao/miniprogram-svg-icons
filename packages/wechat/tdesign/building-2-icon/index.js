var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M21 21V9H3V21H21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 9V4.4L12 2L16 4.4V9H8Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M12 5.99805H12.0039V6.00195H12V5.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 14H9V21H15V14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><path d="M15 14H9V21H15V14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M7 5L12 2L17 5M8 4.9V9M16 4.9V9M21 9V21H3V9H21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

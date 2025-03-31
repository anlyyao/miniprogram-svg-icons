var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 15H8C5.9602 15 4.27732 16.5269 4.03125 18.5C4.01082 18.3362 4 18.1693 4 18V6C4 3.79086 5.79086 2 8 2H20V15Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M9 15H13V19L11 18L9 19V15Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9 15H13V19L11 18L9 19V15Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M20 15V2H7.5C5.567 2 4 3.567 4 5.5V18.5M20 15V22H7.5C5.567 22 4 20.433 4 18.5M20 15H7.5C5.567 15 4 16.567 4 18.5M9.00391 6.00391H9V6H9.00391V6.00391ZM9.00391 9.00391H9V9H9.00391V9.00391Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

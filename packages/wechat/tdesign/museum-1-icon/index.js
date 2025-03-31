var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11.9999 3C10.5215 3 9.14647 3.44251 8 4.2023V21H16L16 4.20241C14.8535 3.44255 13.4784 3 11.9999 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 21V16M16 21V15C16 11.6863 18.6863 9 22 9V21H16ZM8 21V15C8 11.6863 5.31371 9 2 9V21H8ZM12 7.99805H12.0039V8.00195H12V7.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 4.7V21H16L16 4.70011M7.00195 4.99804C7.3101 4.7047 7.64403 4.43821 8 4.2023C9.14647 3.44251 10.5215 3 11.9999 3C13.4784 3 14.8535 3.44255 16 4.20241C16.3567 4.43882 16.6913 4.70593 16.9999 4.99999" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M2 9C5.31371 9 8 11.6863 8 15V21H2V9Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 9C18.6863 9 16 11.6863 16 15V21H22V9Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 11H21V12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12V11Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 11L4 11C4 9.99104 4.18678 8.712 4.52766 7.45268C5.38744 4.2763 8.70931 3 12 3C15.2933 3 18.6138 4.27771 19.4735 7.45682C19.8136 8.7148 20 9.99214 20 11Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 11H21V12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12V11Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M20 11L4 11C4 9.99104 4.18678 8.712 4.52766 7.45268C5.38744 4.2763 8.70931 3 12 3C15.2933 3 18.6138 4.27771 19.4735 7.45682C19.8136 8.7148 20 9.99214 20 11Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8.99805 7.99805H9.00195V8.00195H8.99805V7.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M11.998 5.99805H12.002V6.00195H11.998V5.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14.998 7.99805H15.002V8.00195H14.998V7.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});

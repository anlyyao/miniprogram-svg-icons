var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M21 7.5C21 8.32843 20.3284 9 19.5 9C18.6716 9 18 8.32843 18 7.5C18 6.67157 18.6716 6 19.5 6C20.3284 6 21 6.67157 21 7.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M8.25025 15.7983C7.53281 16.2125 6.61543 15.9667 6.20121 15.2493C5.787 14.5318 6.03281 13.6144 6.75025 13.2002C7.46769 12.786 8.38508 13.0318 8.79929 13.7493C9.2135 14.4667 8.96769 15.3841 8.25025 15.7983Z" fill="{{fillColor2 || 'transparent'}}" /></g><path d="M21 21H3V3" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8.79932 13.7499L18.1999 8.26074M21 7.5C21 8.32843 20.3284 9 19.5 9C18.6716 9 18 8.32843 18 7.5C18 6.67157 18.6716 6 19.5 6C20.3284 6 21 6.67157 21 7.5ZM8.25025 15.7983C7.53281 16.2125 6.61543 15.9667 6.20121 15.2493C5.787 14.5318 6.03281 13.6144 6.75025 13.2002C7.46769 12.786 8.38508 13.0318 8.79929 13.7493C9.2135 14.4667 8.96769 15.3841 8.25025 15.7983Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

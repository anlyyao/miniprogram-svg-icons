var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 3H3V21H21V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 3H3V21H21V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14.5 14.5L18.5 13M6.5 17.5L10.5 16M18 7.5C18 8.71875 16.5 9.75 16.5 9.75C16.5 9.75 15 8.71861 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5ZM10 10.5C10 11.7188 8.5 12.75 8.5 12.75C8.5 12.75 7 11.7186 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M18 7.5C18 8.71875 16.5 9.75 16.5 9.75C16.5 9.75 15 8.71861 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M10 10.5C10 11.7188 8.5 12.75 8.5 12.75C8.5 12.75 7 11.7186 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});

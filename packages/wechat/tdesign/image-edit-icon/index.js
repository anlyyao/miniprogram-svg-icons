var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.5 19.7866L13.5008 22.5H16.2134L20.164 18.5495L17.4506 15.8361L13.5 19.7866Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 9V3H3V21H9M13.5 14.5L9 10L3.5 15.5M17.75 8.25C17.75 9.35457 16.8546 10.25 15.75 10.25C14.6454 10.25 13.75 9.35457 13.75 8.25C13.75 7.14543 14.6454 6.25 15.75 6.25C16.8546 6.25 17.75 7.14543 17.75 8.25Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17.4506 15.836L13.5 19.7866L13.5008 22.5H16.2134L20.164 18.5494M17.4506 15.836L19.7866 13.5L22.5 16.2134L20.164 18.5494M17.4506 15.836L20.164 18.5494" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

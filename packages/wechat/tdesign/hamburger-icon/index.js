var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M4 10C4 5.58172 7.58173 3 12 3C16.4183 3 20 5.58172 20 10H4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 18H20C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18Z" fill="{{fillColor1 || 'transparent'}}" /></g><g><path d="M4 10C4 5.58172 7.58173 3 12 3C16.4183 3 20 5.58172 20 10H4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M4 18H20C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g><path d="M3 15L6 13L9 15L12 13L15 15L18 13L21 15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

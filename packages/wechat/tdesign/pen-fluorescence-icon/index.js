var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5.86288 14.9653L8.69113 17.7932L7.24215 19.2422L4.41373 19.2422L2.99951 17.828L5.86288 14.9653Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M13.044 5.05713L4.5 13.6018L10.0002 19.1021L18.5442 10.5575L13.044 5.05713Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5.86288 14.9653L8.69113 17.7932L7.24215 19.2422L4.41373 19.2422L2.99951 17.828L5.86288 14.9653Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M13.044 5.05701L4.5 13.6016L10.0002 19.102L18.5442 10.5574M13.044 5.05701L18.5442 10.5574M13.044 5.05701L16.1007 2L21.601 7.50036L18.5442 10.5574" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

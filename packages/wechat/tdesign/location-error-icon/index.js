var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 10C20 16.5 12 22 12 22C12 22 4 16.4992 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20 10C20 16.5 12 22 12 22C12 22 4 16.4992 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9.87891 8.37891L12.0002 10.5002M12.0002 10.5002L14.1215 12.6215M12.0002 10.5002L14.1215 8.37891M12.0002 10.5002L9.87891 12.6215" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

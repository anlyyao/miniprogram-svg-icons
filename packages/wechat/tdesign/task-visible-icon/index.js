var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 19C12 19 13.4974 22.4998 17 22.5C20.5026 22.5002 22 19 22 19C22 19 20.5026 15.4977 17 15.5C13.4974 15.5023 12 19 12 19Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M8 6V4H4V22H9M8 6H16M8 6V2H16V6M16 6V4H20V12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16.75 19H17.25M17 22.5C13.4974 22.4998 12 19 12 19C12 19 13.4974 15.5023 17 15.5C20.5026 15.4977 22 19 22 19C22 19 20.5026 22.5002 17 22.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

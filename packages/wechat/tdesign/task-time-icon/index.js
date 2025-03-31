var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.5 18C13.5 20.4853 15.5147 22.5 18 22.5C20.4853 22.5 22.5 20.4853 22.5 18C22.5 15.5147 20.4853 13.5 18 13.5C15.5147 13.5 13.5 15.5147 13.5 18Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M8 6V4H4V22H11M8 6H16M8 6V2H16V6M16 6V4H20V10" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18 16.752V17.9999L19 19M18 22.5C15.5147 22.5 13.5 20.4853 13.5 18C13.5 15.5147 15.5147 13.5 18 13.5C20.4853 13.5 22.5 15.5147 22.5 18C22.5 20.4853 20.4853 22.5 18 22.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 22H20V8H14V2H4V22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M13 16V11H15M13 16C13 16.8284 12.3284 17.5 11.5 17.5C10.6716 17.5 10 16.8284 10 16C10 15.1716 10.6716 14.5 11.5 14.5C12.3284 14.5 13 15.1716 13 16Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21V3H13V21H3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 11V21H13V11H21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M17 21V17" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M13 21H3V15M13 21V15M13 21V11M13 21H21V11H13M3 15H8M3 15V3H13V15M3 15H13M13 15H8M8 15V3M3 7H13M3 11H13" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 3H2V17H22V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M4 21H20M2 3H22V17H2V3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 7V9M16 7V9M16 12V13M12 10V13M8 12V13M12.0039 7V7.00391H12V7H12.0039Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

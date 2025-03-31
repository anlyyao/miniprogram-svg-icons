var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11.9971 21H12H20V5.40018L15.9985 3L11.9985 5.49908L7.99854 3L3.99707 5.40018V21H11.9971Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M16 16V21M8 16V21M16 9.99805H16.0039V10.002H16V9.99805ZM8 9.99805H8.00391V10.002H8V9.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 21H11.9971M12 21H20M12 21V5.5L11.9985 5.49908M11.9971 21H3.99707M11.9971 21V5.5L11.9985 5.49908M11.9985 5.49908L7.99854 3L2.99707 6M11.9985 5.49908L15.9985 3L21 6M19.9985 21V5.9M3.99854 21V5.9" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});

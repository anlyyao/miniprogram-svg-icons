var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5 3H19V20L16.5 18L14.25 20L12 18L9.75 20L7.5 18L5 20V3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5 3H19M5 3V20L7.5 18L9.75 20L12 18L14.25 20L16.5 18L19 20V3M5 3H3M19 3H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 8H15M10 12H14" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
